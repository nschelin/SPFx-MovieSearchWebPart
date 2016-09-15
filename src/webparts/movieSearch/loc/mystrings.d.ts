declare interface IMovieSearchStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'movieSearchStrings' {
  const strings: IMovieSearchStrings;
  export = strings;
}
