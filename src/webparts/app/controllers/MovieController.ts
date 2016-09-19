import DataService from '../services/dataService';

export default class MovieController {
  public listName: string;
  public movies: Array<MovieData>;
  public lastSearchTerm: string = '';

  constructor(private $scope: IMovieScope,
              private $rootScope: ng.IRootScopeService,
              private dataService: DataService) {

        this.movies = new Array<MovieData>();

        $rootScope.$on('configurationChanged',
          (event: ng.IAngularEvent,
            args: {
              listName: string
          }): void => {
            this.listName = args.listName;
        });
  }

  public SearchEnter(evt: any): void {
      if(evt.which === 13) {
          evt.preventDefault();
          this.Search();
      }
  }

  public Search(): void {
    this.dataService.getMovies(this.$scope.title).then((data) => {
      if(data instanceof Array) {
          this.movies = data.map((item) => {
              const movie = new MovieData();
              movie.title = item.Title;
              if(item.Poster.startsWith("http")) {
                movie.imgUrl = item.Poster;//.substring(item.Poster.indexOf("//"));
              }
              else {
                movie.imgUrl = 'NA';
              }
              movie.imdbID = item.imdbID;
              return movie;
          });
      }

    });
    this.lastSearchTerm = this.$scope.title;
    this.$scope.title = '';
  }
}

export interface IMovieScope extends ng.IScope {
    title: string;
}

export class MovieData implements IMovieData {
  public title: string;
  public imgUrl: string;
  public imdbID: string;
  constructor() { }
}

export interface IMovieData {
  title: string;
  imgUrl: string;
  imdbID: string;
}