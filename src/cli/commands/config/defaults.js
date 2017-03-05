/**
 * Copyright 2016, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Table = require('cli-table2');

const config = require('../../../config');
const configCommand = require('./');
const Controller = require('../../controller');
const defaults = require('../../../defaults');
const EXAMPLES = require('../../examples');

const COMMAND = `functions config defaults ${'[options]'.yellow}`;
const DESCRIPTION = `Prints the default configuration values.`;
const USAGE = `Usage:
  ${COMMAND.bold}

Description:
  ${DESCRIPTION}`;

/**
 * http://yargs.js.org/docs/#methods-commandmodule-providing-a-command-module
 */
exports.command = 'defaults';
exports.description = DESCRIPTION;
exports.builder = (yargs) => {
  yargs
    .usage(USAGE)
    .options({
      json: {
        alias: 'j',
        description: 'Formats the output as prettified JSON.',
        requiresArg: false,
        type: 'boolean'
      }
    })
    .epilogue(configCommand.helpMessage);

  EXAMPLES['config.defaults'].forEach((e) => yargs.example(e[0], e[1]));
};
exports.handler = (opts) => {
  const controller = new Controller(opts);

  if (opts.json) {
    controller.log(JSON.stringify(defaults, null, 2));
  } else {
    controller.log(`${configCommand.helpMessage}\n`);
    controller.log(`Config file: ${config.path.green}`);

    const table = new Table({
      head: ['Key'.bold, 'Value'.bold]
    });

    let value;

    for (let key in defaults) {
      value = defaults[key];

      table.push([key, `${value}`]);
    }

    controller.log(table.toString());
  }
};
