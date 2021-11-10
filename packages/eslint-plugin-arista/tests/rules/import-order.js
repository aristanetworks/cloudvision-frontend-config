// eslint-disable-next-line import/no-extraneous-dependencies
const RuleTester = require('eslint').RuleTester;
const rule = require('../../src/rules/import-order');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('order', rule, {
  // Valid test cases
  valid: [
    {
      // Testing external npm packages
      code:
        "import _ from 'lodash';\n" +
        "import PropTypes from 'prop-types';\n" +
        "import React, { Component } from 'react';\n" +
        "import { Button, Modal } from 'react-bootstrap';\n",
    },
    {
      // Testing internal npm packages
      code:
        "import { NOTIF_TYPES } from '@arista/aeris-connector';\n" +
        "import { createReducer } from '@arista/redux-typed-reducer';\n",
    },
    {
      // Testing webpack alias i.e. geiger-* and modules/main
      code:
        "import MediaObj from 'geiger-components/MediaObj';\n" +
        "import { formatEventTimestamp } from 'geiger-utils/formatTime';\n",
    },
    {
      // Testing more webpack alias i.e. geiger-* and modules/main
      code:
        "import DataTable from 'geiger-components/DataTable';\n" +
        "import RelatedLinks from 'geiger-components/RelatedLinks';\n" +
        "import { subscribe } from 'geiger-components/Subscribe';\n" +
        "import { POINT_IN_TIME } from 'geiger-components/Subscribe/constants';\n" +
        "import Timestamp from 'geiger-components/Timestamp';\n" +
        "import { blank_ARRAY, NO_DATA_MSG, COL_SORT_DIR, LIVE_TIME } from 'geiger-constants';\n" +
        "import { DEVICE_SNAPSHOT_LIST } from 'geiger-metrics';\n" +
        "import * as GeigerPropTypes from 'geiger-prop-types';\n" +
        "import { formatFullDateTime } from 'geiger-utils/formatTime';\n" +
        "import { selectors as MainSelectors } from 'modules/main';\n",
    },
    {
      // Testing local imports from other directories in 'this' module
      code:
        "import EventListItem from 'modules/events/components/EventListItem';\n" +
        "import * as DeviceSelectors from 'modules/events/selectors';\n",
    },
    {
      // Testing more local imports from other directories in 'this' module
      code:
        "import Card from 'modules/events/containers/Card';\n" +
        "import Header from 'modules/events/containers/Header';\n" +
        "import Sidebar from 'modules/events/containers/Sidebar';\n" +
        "import * as EventSelectors from 'modules/events/selectors';\n" +
        'import {\n' +
        '  didEventChange,\n' +
        '  getEventSourceName,\n' +
        '  getEventTurbineId,\n' +
        '  setEventAndTimeWindow,\n' +
        '  filterEvents,\n' +
        "} from 'modules/events/utils';\n",
    },
    {
      // Testing local imports from the parent directory
      code:
        "import DataTable from '..';\n" +
        "import { BATCHED_DATA } from '../constants';\n" +
        "import { processData } from '../utils';\n",
    },
    {
      // Testing more local imports from the parent directory
      code:
        "import { setData } from '../../utils';\n" +
        "import { generateCategoricalData } from '../../utils/dataUtils';\n" +
        'import {\n' +
        '  randomArrayItem,\n' +
        '  randomIntRange,\n' +
        '  randomIPv4Address,\n' +
        '  randomMacAddress,\n' +
        "} from '../../utils/randomUtils';\n",
    },
    {
      // Testing local imports from the current directory
      code:
        "import dataGenerator from './dataGenerator';\n" +
        "import { devices } from './devices';\n" +
        "import { interfaces } from './intfs';\n",
    },
    {
      // Testing more local imports from the current directory
      code:
        "import DevicesColumn from './DevicesColumn';\n" +
        "import InputModal from './InputModal';\n" +
        "import PreviewAndSaveModal from './PreviewAndSaveModal';\n" +
        "import RemoveModal from './RemoveModal';\n" +
        "import TagsColumn from './TagsColumn';\n" +
        'import {\n' +
        '  getChanges,\n' +
        '  getNumChanges,\n' +
        '  isDevicesSelected,\n' +
        '  prepareChanges,\n' +
        '  processDevices,\n' +
        "} from './utils';\n",
    },
    {
      // Testing imports from multiple different groups
      code:
        "import PropTypes from 'prop-types';\n" +
        '\n' +
        "import EventListItem from 'modules/events/components/EventListItem';\n" +
        '\n' +
        "import { BATCHED_DATA } from '../constants';\n",
    },
  ],
  // Invalid test cases
  invalid: [
    // Testing publishing warnings i.e. the problem message
    {
      // Testing out of order imports of external npm packages
      code:
        "import PropTypes from 'prop-types';\n" +
        "import moment from 'moment';\n" +
        "import _ from 'lodash';\n",
      errors: [
        { message: "'moment' import should occur before 'prop-types' import" },
        { message: "'lodash' import should occur before 'prop-types' import" },
      ],
    },
    {
      // Testing out of order imports with improper line breaking of external npm packages
      code:
        "import moment from 'moment';\n" +
        "import _ from 'lodash';\n" +
        '\n' +
        "import PropTypes from 'prop-types';\n",
      errors: [
        { message: "'lodash' import should occur before 'moment' import" },
        { message: 'There should be no blank lines within an import group' },
      ],
    },
    {
      // Testing out of order imports from two different groups
      code:
        "import { NOTIF_TYPES } from '@arista/aeris-connector';\n" +
        "import { createReducer } from '@arista/redux-typed-reducer';\n" +
        '\n' +
        "import PropTypes from 'prop-types';\n" +
        "import React from 'react';\n",
      errors: [
        { message: "'prop-types' import should occur before '@arista/aeris-connector' import" },
        { message: "'react' import should occur before '@arista/aeris-connector' import" },
      ],
    },
    {
      // Testing out of order imports from two different groups with improper line breaking
      code:
        "import { NOTIF_TYPES } from '@arista/aeris-connector';\n" +
        '\n' +
        "import { createReducer } from '@arista/redux-typed-reducer';\n" +
        "import PropTypes from 'prop-types';\n" +
        "import React from 'react';\n",
      errors: [
        { message: 'There should be no blank lines within an import group' },
        { message: 'There should be one blank line between import groups' },
        { message: "'prop-types' import should occur before '@arista/aeris-connector' import" },
        { message: "'react' import should occur before '@arista/aeris-connector' import" },
      ],
    },
    {
      // Testing out of order imports from multiple different groups with improper line breaking
      code:
        "import './styles.less';\n" +
        '\n' +
        "import PropTypes from 'prop-types';\n" +
        '\n' +
        "import { devices } from './devices';\n" +
        "import React from 'react';\n",
      errors: [
        { message: "'./styles.less' import should occur after 'react' import" },
        { message: "'./devices' import should occur after 'react' import" },
        { message: 'There should be one blank line between import groups' },
      ],
    },
    {
      // Testing imports from multiple different groups with improper line breaking
      code:
        "import PropTypes from 'prop-types';\n" +
        "import EventListItem from 'modules/events/components/EventListItem';\n" +
        "import { BATCHED_DATA } from '../constants';\n",
      errors: [
        { message: 'There should be one blank line between import groups' },
        { message: 'There should be one blank line between import groups' },
      ],
    },
  ],
});
