import * as migration_20261015_051121_initial from './20261015_051121_initial';

export const migrations = [
  {
    up: migration_20261015_051121_initial.up,
    down: migration_20261015_051121_initial.down,
    name: '20261015_051121_initial'
  },
];
