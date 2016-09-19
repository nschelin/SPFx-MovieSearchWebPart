export default class ngEnter implements ng.IDirective {
  link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: INgEnterAttributes) {
      element.bind('keydown keypress', (evt) => {
          if(evt.which === 13) {
              scope.$apply(() => {
                  scope.$eval(attrs.ngEnter, { 'event': evt });
              });

              evt.preventDefault();
          }
      });
  }
}

export interface INgEnterAttributes extends ng.IAttributes {
  ngEnter: any;
}