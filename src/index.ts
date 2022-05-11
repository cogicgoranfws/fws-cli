#!env/bin/usr node
import { Command } from 'commander';

const { App } = require('./app');
const program = new Command();
App.init(program);