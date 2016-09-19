import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import styles from './MovieSearch.module.scss';
//import styles from '../app/controllers/moviestyles.scss';
import * as strings from 'movieSearchStrings';
import { IMovieSearchWebPartProps } from './IMovieSearchWebPartProps';
import * as angular from 'angular';
import '../app/app';

export default class MovieSearchWebPart extends BaseClientSideWebPart<IMovieSearchWebPartProps> {

  private $injector: ng.auto.IInjectorService;
  public constructor(context: IWebPartContext) {
    super(context);

  }

  public render(): void {
    if(this.renderedOnce === false) {
    this.domElement.innerHTML = `

        <div ng-controller="MovieController as movieCtrl" ng-cloak>
          <h1>Movie Search</h1>
            <div>
              <label for="title">Title</label>
              <input type="text" name="title" ng-keydown="movieCtrl.SearchEnter($event)" ng-model="title" /> <button type="button" ng-click="movieCtrl.Search()">Search</button>
            </div>
            <div class="${styles.lastSearchTerm}">
              <span ng-show="movieCtrl.lastSearchTerm !== ''">Last Search Term: {{ movieCtrl.lastSearchTerm }}</span>
            </div>
            <div>
              <ul class="${styles.movieInfo}">
                <li ng-repeat="movie in movieCtrl.movies">
                  <div class="${styles.movieTitle}">
                    <a href="http://www.imdb.com/title/{{movie.imdbID}}" target="_blank">
                      {{movie.title}}
                    </a>
                  </div>
                  <div class="${styles.movieImg}">
                    <a ng-show="movie.imgUrl !== 'NA'" href="http://www.imdb.com/title/{{movie.imdbID}}" target="_blank">
                      <img alt="{{movie.title}}" style="width: 100px" src="{{movie.imgUrl}}" />
                    </a>
                    <span ng-hide="movie.imgUrl !== 'NA'">No Image</span>
                  </div>
                </li>
              </ul>
            </div>
        </div>
      `;
      this.$injector = angular.bootstrap(this.domElement, ['MovieApp']);
    }
   this.$injector.get('$rootScope').$broadcast('configurationChanged', {
        listName: this.properties.listName
      });
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField("listName", {
                  label: "List Name"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
