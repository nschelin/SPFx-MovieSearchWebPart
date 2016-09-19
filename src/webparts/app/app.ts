import * as angular from 'angular';
import DataService from './services/dataService';
import ngEnter from './directives/ngEnter';
import MovieController from './controllers/MovieController';
const app: ng.IModule = angular.module('MovieApp', []);

app
//.directive('ngEnter', <any>ngEnter)
.service('dataService', DataService)
.controller('MovieController', MovieController);