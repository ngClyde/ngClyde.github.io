/* Clyde D'Souza http://goo.gl/8yXVaA | Angular resources at https://github.com/ngClyde */

/* app.js */

/* this is the script file where we have written the our Angular scripts which tell Angular to bootstrap itself to our app as well as create various
 * Angular components.
 * it is not necessary to name this file app.js and it is not necessary to include all the code in one .js file, just ensure you include these .js files in your HTML page using <script> like we have done in index.html
 * as your app grows it is advisable to keep controller, services, custom directives and modules in separate .js file each so that it will end up being manageable
 */

/*
 * angular.module('app', []) // no dependencies
 * angular.module('app', ['ngRoute']) // dependency on ngRoute module
 * This creates a new module and may have dependencies. The array of Strings refers to other module names and while creating a module we have two arguments
 * unlike using an existing module where only one argument is specified.
 */
angular.module('ngClyde', ['ngRoute']);


/*
 * configure routes for displaying partial templates in our main layout template (index.html)
 * although dynamic content is loaded within the main page, notice that the url changes according to the routes you have specified
 * this is useful for deep linking where each 'page' can have its own unique address and can be bookmarked / shared
 */
angular.module('ngClyde')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when("/", { templateUrl: "/views/about.html", controller: "IndexController" })
        .when("/projects", { templateUrl: "/views/projects.html", controller: "ProjectsController" })
        .when("/contact", { templateUrl: "/views/contact.html", controller: "ContactController" })
        .otherwise("/404", { templateUrl: "/views/about.html", controller: "IndexController" });
    }]);


/*
 * create a controller using module.controller
 * here we are using inline array for dependency injection which is the safest with or without minification
 */
angular.module('ngClyde')
    .controller('IndexController', ['$scope', function ($scope) {
        $scope.footerDate = new Date();
        $scope.aboutImage = "";
        $scope.description = {};
        $scope.description = [{ p: "Hi. I am Clyde D'Souza. I live in Auckland, New Zealand but originally from Thane, Mumbai. I have completed my graduation in Information Technology from University of Mumbai and a postgraduate diploma in Computer and Information Sciences from AUT University, Auckland, New Zealand and currently I am doing my internship at Datacom. My aim is to gain practical knowledge in my field of study and excel in it with the help of my determination and motivation that keeps me going at my best." },
            { p: "Particularly, I have an inclination towards web development and possess the required technical skills. Along with that I also have good communication and leadership skills. I generally take up some self-thought projects where I can explore and learn the language and strive hard to bring the desired output. And in fact, I already had this wonderful opportunity of designing and developing a website for the BMS departments' annual fest Inspira which went live in August 2012. Here, in New Zealand, I have also been a part of various hackathon's developing WordPress websites for charitable organisations. I have also developed a Windows Store App called 'Kiwi Sports'. [Read More: Projects]" },
            { p: "Furthermore, I have been a compere at various events held in college including the annual fest Spectrum. I really enjoy that on-stage life and that has added a great deal of confidence within me. I also love talking to people and understanding their perspective towards life. Moreover, I have contributed my articles as well as designed magazine covers for Our Lady of Mercy Church, Thane parish bulletin. I also write some refreshing content on my blog Creative Center. And of late, I have been sketching too." }];
    }]);

angular.module('ngClyde')
    .controller('ContactController', ['$scope', function ($scope) {
        $scope.formEmailId = "";
        $scope.formMessage = "";
        $scope.contactFormSendSuccess = false;
        $scope.contactFormSendError = false;
        $scope.sendFormDetails = function () {
            $scope.contactFormSendSuccess = true;
            $scope.contactFormSendError = false;
            $scope.formEmailId = "";
            $scope.formMessage = "";
            $scope.formEmailId = "";
        };
    }]);


/*
 * this controller uses the $http service to make AJAX requests
 * the GET request returns a promise object and we can call .then() method on that object which has a success function as one argument and a failure function as another argument
 * you don't have to name the methods as success / failure
 * we also can use the .finally() on the promise object which executes in case of success and failure
 * consider this as the finally block of a try-catch code
 */
angular.module('ngClyde')
    .controller('ProjectsController', ['$scope','$http', function ($scope,$http) {
        $scope.projects = {};
        $scope.projectsFilter = "";
        $scope.projectsFlag = true;
        $http.get("https://raw.githubusercontent.com/ngClyde/ngClyde.github.io/master/js/projects.json")
            .then(function successFunction(jsonData){
                $scope.projects = jsonData.data;
                $scope.projectsFlag = true;
            },
            function failureFunction() {
                $scope.projectsFlag = false;
            })
            .finally(function () {
                console.log("Finally block is executed in both scenarios - success and failure");
            });
    }]);


/*
 * we can create our own directive and use that in our layout template using the module.directive() method
 * we use a normalized name for our directive which is case sensitive and doesn't contain hyphens
 * therefore, webapp-footer becomes webappFooter when writing your own directive
 *
 * every directive returns a value
 * retrict : 'E' means that this directive is made to be used as an element i.e. tag name in HTML like <b> <p> <h1>
 * we could write restrict : 'A' which would mean that our directive is to be used like an attribute
 * templateUrl: 'path/to/html/code' is where we specify which piece of HTML code to bind to the custom directive
 * in this example we create our custom directive to display a static footer in the web app which may not be the case in production web apps
 */
angular.module('ngClyde')
    .directive('webappFooter', function () {
        return {
            restrict: 'E',
            templateUrl: '../views/footer.html'
        };
    });