/**
 * Report errors regarding blank lines and import ordering according to Arista's conventions.
 */

const importedGroups = require('../utils/importedGroups');

// The enforced order is the same as the order of each element in a group.
const DEFAULT_GROUPS = [
  'external',
  'internal',
  ['geiger', 'main'],
  'module',
  'parentDirectory',
  'currentDirectory',
  'stylesheet',
];
const DEFAULT_GROUPS_FLATTENED = DEFAULT_GROUPS.flat();

/**
 * Sort and mutate the individual rank of each import within its own group alphabetically
 * @param importedItems - an array of import items
 */
function alphabetizeIndividualRanks(importedItems) {
  const importedItemsGroupedByGroupRanks = importedItems.reduce((prev, importedItem) => {
    if (prev[importedItem.rank]) {
      prev[importedItem.rank].push(importedItem.name);
    } else {
      prev[importedItem.rank] = [importedItem.name];
    }
    return prev;
  }, {});
  const sortedGroupRanks = Object.keys(importedItemsGroupedByGroupRanks).sort();

  sortedGroupRanks.forEach((rank) => {
    // Sort the importedItems alphabetically within its own group
    importedItemsGroupedByGroupRanks[rank].sort();
  });
  // Build up the list of alphabetically-sorted importedItems
  const sortedImportedItems = sortedGroupRanks.reduce(
    (prev, rank) => prev.concat(importedItemsGroupedByGroupRanks[rank]),
    [],
  );

  // Modify the individual rank of each import
  // according to the its position in sortedImportedItems
  importedItems.forEach((importedItem) => {
    importedItem.rank = sortedImportedItems.indexOf(importedItem.name);
  });
}

/**
 * Get a message for reporting the unordered
 * @param targetImportItem - import to be moved towards
 * @param outOfOrderItem - import to move
 * @param order - 'before' or 'after'
 * @returns warning message
 */
function createWarningMsg(targetImportItem, outOfOrderItem, order) {
  return `'${outOfOrderItem.name}' import should occur ${order} '${targetImportItem.name}' import`;
}

/**
 * Get an array of unordered import items
 * @param importedItems - an array of import items
 * @returns unordered import items
 */
function findOutOfOrder(importedItems) {
  if (importedItems.length === 0) {
    return [];
  }
  let lastSeenInOrderNode = importedItems[0];
  return importedItems.filter((importedModule) => {
    const res = importedModule.rank < lastSeenInOrderNode.rank;
    if (lastSeenInOrderNode.rank < importedModule.rank) {
      lastSeenInOrderNode = importedModule;
    }
    return res;
  });
}

/**
 * Get the import item where the unordered imports will be moving towards
 * @param importedItems - an array of import items
 * @param outOfOrderItem - an unordered import item
 * @returns the target import item
 */
function findTargetImportItem(importedItems, outOfOrderItem) {
  return importedItems.find((importedItem) => importedItem.rank > outOfOrderItem.rank);
}

/**
 * Get an object with group-rank pairs.
 * @param groups - an array of import groups
 * the enforced order is the same as the order of each element in this groups
 * By default: {
 *   external: 0,
 *   internal: 1,
 *   geiger: 2,
 *   main: 2,
 *   module: 3,
 *   parentDirectory: 4,
 *   currentDirectory: 5,
 *   stylesheet: 6
 *   }
 * @returns group-rank object
 */
function getGroupRanks(groups) {
  const groupRanks = {};

  groups.forEach((group, index) => {
    if (typeof group === 'string') {
      groupRanks[group] = index;
    } else if (Array.isArray(group)) {
      group.forEach((item) => {
        groupRanks[item] = index;
      });
    }
  });
  return groupRanks;
}

/**
 * Get the number of blank lines between two AST nodes
 * @param context - the context object
 * @param firstNode - the first AST node
 * @param secondNode - the second AST node
 * @returns number of blank lines
 */
function getBlankLinesCount(context, firstNode, secondNode) {
  const linesBetweenImports = context
    .getSourceCode()
    .lines.slice(firstNode.loc.end.line, secondNode.loc.start.line - 1);

  return linesBetweenImports.filter((line) => !line.trim().length).length;
}

/**
 * Check whether a group is of the eight default group types
 * @param groups - an array of import groups
 */
function isGroupOfUnknownType(groups) {
  const res = groups.flat().every((group) => DEFAULT_GROUPS_FLATTENED.includes(group));

  if (!res) {
    throw new Error('Incorrect configuration of the rule: Unknown group type');
  }
}

/**
 * Check whether the group has duplicate elements
 * @param groups - an array of import groups
 */
function isGroupDuplicate(groups) {
  const res = groups.flat().every((group, index, self) => self.indexOf(group) === index);

  if (!res) {
    throw new Error('Incorrect configuration of the rule: duplicated groups');
  }
}

/**
 * Get an object of reversed import items for
 * deciding the direction of prompting users to move unordered imports towards
 * @param importedItems - an array of import items
 * @returns an object of import items with reversed rankings
 */
function reverse(importedItems) {
  return importedItems
    .map((importedItem) => ({
      name: importedItem.name,
      rank: -importedItem.rank,
      groupRank: -importedItem.rank,
      node: importedItem.node,
    }))
    .reverse();
}

/**
 * Publish warnings for sorting imports
 * @param context - the context object
 * @param importedItems - an array of import items
 */
function reportOutOfOrder(context, importedItems) {
  const outOfOrder = findOutOfOrder(importedItems);

  if (!outOfOrder.length) {
    return;
  }

  // Reverse the importedItems to see if it has fewer unordered imports.
  const reversedImportedItems = reverse(importedItems);
  const reversedOutOfOrder = findOutOfOrder(reversedImportedItems);

  if (reversedOutOfOrder.length < outOfOrder.length) {
    reversedOutOfOrder.forEach((outOfOrderItem) => {
      const order = 'after';
      const targetImportItem = findTargetImportItem(reversedImportedItems, outOfOrderItem);
      const message = createWarningMsg(targetImportItem, outOfOrderItem, order);

      context.report({
        node: outOfOrderItem.node,
        message,
      });
    });
  } else {
    outOfOrder.forEach((outOfOrderItem) => {
      const order = 'before';
      const targetImportItem = findTargetImportItem(importedItems, outOfOrderItem);
      const message = createWarningMsg(targetImportItem, outOfOrderItem, order);

      context.report({
        node: outOfOrderItem.node,
        message,
      });
    });
  }
}

/**
 * Construct and return the data structure
 * to store the node for each import along with its ranking
 * @param context - the context object
 * @param node - an AST node
 * @param name - the location of the import declaration
 * @param groupRanks - an object with group-rank pairs
 * @param importedItems - an array of import items
 */
function registerNode(context, node, name, groupRanks, importedItems) {
  const groupRank = groupRanks[importedGroups(name)];

  importedItems.push({
    name,
    groupRank,
    rank: groupRank, // Initially individual rank equals its group rank
    node,
  });
}

/**
 * Publish warnings for proper line breaking
 * @param context - the context object
 * @param importedItems - an array of import items
 */
function reportBlankLines(context, importedItems) {
  const sourceCode = context.getSourceCode();
  importedItems.forEach((currentImport, index) => {
    const currentImportNode = currentImport.node;
    const commentsBeforeCurrentNode = sourceCode.getCommentsBefore(currentImportNode);
    if (index !== 0 && commentsBeforeCurrentNode.length === 0) {
      // Works only when there are no comments above non-initial imports
      const prevImportNode = importedItems[index - 1].node;
      const currentGroupRank = currentImport.groupRank;
      const PrevGroupRank = importedItems[index - 1].groupRank;
      const blankLinesBetween = getBlankLinesCount(context, prevImportNode, currentImportNode);

      if (currentGroupRank !== PrevGroupRank && blankLinesBetween === 0) {
        context.report({
          node: currentImportNode,
          message: 'There should be one blank line between import groups',
        });
      } else if (currentGroupRank === PrevGroupRank && blankLinesBetween !== 0) {
        context.report({
          node: currentImportNode,
          message: 'There should be no blank lines within an import group',
        });
      }
    }
  });
}

module.exports = {
  meta: {
    docs: {},
    schema: [
      {
        type: 'object',
        properties: {
          groups: {
            type: 'array',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function importOrderRule(context) {
    const options = context.options[0] || {};
    const groups = options.groups || DEFAULT_GROUPS;
    let importedItems = [];

    try {
      isGroupOfUnknownType(groups);
      isGroupDuplicate(groups);
    } catch (error) {
      // Malformed configuration
      return {
        Program(node) {
          context.report(node, error.message);
        },
      };
    }

    const groupRanks = getGroupRanks(groups);

    return {
      'ImportDeclaration': function handleimportedItems(node) {
        const name = node.source.value;
        registerNode(context, node, name, groupRanks, importedItems);
      },
      'Program:exit': function reportAndReset() {
        alphabetizeIndividualRanks(importedItems);
        reportBlankLines(context, importedItems);
        reportOutOfOrder(context, importedItems);

        importedItems = [];
      },
    };
  },
};
