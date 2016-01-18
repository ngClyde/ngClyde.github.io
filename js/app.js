angular.module('ngClyde', ['ngRoute']);

angular.module('ngClyde')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when("/", { templateUrl: "/views/about.html", controller: "IndexController" })
        .when("/projects", { templateUrl: "/views/projects.html", controller: "ProjectsController" })
        .when("/github", { templateUrl: "/views/github.html", controller: "IndexController" })
        .when("/contact", { templateUrl: "/views/contact.html", controller: "ContactController" })
        .otherwise("/404", { templateUrl: "/views/about.html", controller: "IndexController" });
    }]);

angular.module('ngClyde')
    .controller('IndexController', ['$scope', function ($scope) {
        $scope.footerDate = new Date();
        $scope.aboutImage = "";
        $scope.description = {};
        $scope.description = [{ p: "Hi! I am Clyde D'Souza. I live in Auckland, New Zealand but originally from Thane, Mumbai. I have completed my graduation in information technology from University of Mumbai and a postgraduate diploma in computer and information sciences from AUT University, Auckland, New Zealand and currently interning at Datacom. My aim is to gain practical knowledge in my field of study and excel in it with the help of my determination and motivation that keeps me going at my best." },
            { p: "Particularly, I have an inclination towards web development and possess the required technical skills. Along with that I also have good communication skills and leadership skills. I generally take up some self-thought projects where I can explore and learn the language and strive hard to bring the desired output. And in-fact, I already had this wonderful opportunity of designing and developing a website for the BMS departments' annual fest Inspira which went live in August 2012. Here, in New Zealand, I have also been a part of various hackathon's developing WordPress websites for charitable organisations. I have also developed a Windows Store App called 'Kiwi Sports'. [Read More: Projects]" },
            { p: "Furthermore, I have been a compere at various events held in college including the annual fest Spectrum. I really enjoy that on-stage life and that has added a great deal of confidence within me. I also love talking to people and understanding their perspective towards life. Moreover, I have contributed my articles as well as designed magazine covers for Our Lady of Mercy Church, Thane parish bulletin. I also write some refreshing content on my blog Creative Center. And offlate, I have been sketching too." }];
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
    }]); 2

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