
export default class DataService {
  private apiUrl: string = '//www.omdbapi.com/?s=';
  constructor(private $q: ng.IQService,
              private $http: ng.IHttpService) {}

  public getMovies(title: string) : ng.IPromise<{}> {

    const def: ng.IDeferred<{}> = this.$q.defer();
    const url = this.apiUrl + encodeURI(title);
    const config: any = {
      url: url,
      method: 'GET',
    };

    this.$http(config).then((response: ng.IHttpPromiseCallbackArg<{ Search: any }>): void => {
        const data = response.data.Search;
        def.resolve(data);
    });

    return def.promise;
  }
}