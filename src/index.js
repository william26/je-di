'use strict';

import moduleCreator, {modules} from './module/module';
import bootstrap from './helpers/bootstrap';

module.exports = {
  module: moduleCreator,
  modules,
  bootstrap
};
