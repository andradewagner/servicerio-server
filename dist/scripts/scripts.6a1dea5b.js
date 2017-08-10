"use strict";angular.module("clientApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!0),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/quem_somos",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/time",{templateUrl:"views/team.html"}).when("/time/estabelecimentos",{templateUrl:"views/team_places.html",controller:"PlacesCtrl",controllerAs:"places"}).when("/time/profissionais",{templateUrl:"views/team_professionals.html",controller:"ProfessionalsCtrl",controllerAs:"professionals"}).when("/fale_conosco",{templateUrl:"views/faleconosco.html",controller:"ContatoCtrl",controllerAs:"contato"}).otherwise({redirectTo:"/"})}]),angular.module("clientApp").controller("MainCtrl",["$http",function(a){var b=a.get("/api/users"),c=this;b.then(function(a){c.awesomeUsers=a.data.users}),b["catch"](function(a){console.log(a)})}]),angular.module("clientApp").controller("AboutCtrl",["$http",function(a){var b=a.get("/api/quem_somos"),c=this;b.then(function(a){c.result=a.data}),b["catch"](function(a){console.log(a)})}]),angular.module("clientApp").controller("TeamCtrl",["$http",function(a){}]),angular.module("clientApp").controller("PlacesCtrl",["$http",function(a){var b=a.get("/api/team/places"),c=this;b.then(function(a){c.result=a.data}),b["catch"](function(a){console.log(a)})}]),angular.module("clientApp").controller("ProfessionalsCtrl",["$http",function(a){var b=a.get("/api/professionals"),c=this;b.then(function(a){c.result=a.data}),b["catch"](function(a){console.log(a)})}]),angular.module("clientApp").controller("ContatoCtrl",["$http",function(a){var b=this;b.sucesso=!1,b.erro=!1,this.enviar=function(){var c={method:"POST",url:"/api/fale_conosco",headers:{"Content-Type":"application/json"},data:{nome:b.nome,email:b.email,mensagem:b.mensagem}};a(c).then(function(){b.sucesso=!0,b.erro&&(b.erro=!1),b.limparCampos()},function(){b.erro=!0})},this.limparCampos=function(){b.nome="",b.email="",b.mensagem=""}}]),angular.module("clientApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="jumbotron"> <h2>{{about.result.title}}</h2> <p class="lead"> <img src="images/logo.60a0aed5.png" alt="Service Rio"><br> {{about.result.description}} </p> </div>'),a.put("views/erro.html",""),a.put("views/faleconosco.html",'<div class="container"> <div class="alert alert-success fade in" ng-show="contato.sucesso"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Obrigado pela sua mensagem! Entraremos em contato rapidamente.</strong> </div> <div class="alert alert-danger fade in" ng-show="contato.erro"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Desculpe! Houve um erro ao enviar sua mensagem. Pode tentar novamente clicando no botão enviar.</strong> </div> <form class="form-group" action="/api/fale_conosco" method="post"> <div class="form-group row"> <label for="nome">Nome</label> <input type="text" name="nome" class="form-control" id="nome" ng-model="contato.nome" placeholder="Informe seu nome"> </div> <div class="form-group row"> <label for="email">Email</label> <input type="email" name="email" class="form-control" id="email" ng-model="contato.email" aria-describedby="emailInforme" placeholder="Informe seu Email"> <small id="emailInforme" class="form-text text-muted">Nunca compartilharemos seu email com alguém.</small> </div> <div class="form-group row"> <label for="campoTexto">Mensagem</label> <textarea class="form-control" name="mensagem" id="campoTexto" ng-model="contato.mensagem" rows="3"></textarea> </div> <button type="button" class="btn btn-success" ng-click="contato.enviar()">Enviar</button> </form> </div>'),a.put("views/main.html",'<div class="jumbotron"> <h1>Service Rio</h1> <p class="lead"> <img src="images/logo.60a0aed5.png" alt="Service Rio"><br> Encontre uma infinidade de lojas e profissionais liberais de acordo com a sua necessidade </p> <!-- Right here, this guy. Note the removed Hash as well. --> <p><a class="btn btn-lg btn-success" ng-href="/time">Conheça nosso time</a></p> </div> <div class="row marketing"> <h4><i class="fa fa-address-book" aria-hidden="true"></i> Seu catálogo online!</h4> <p> Buscando uma loja ou um profissional liberal? </p> <p> Aqui você encontra o todo tipo de serviço: </p> <ul> <li>Loja de móveis</li> <li>Pedreiros</li> <li>Marceneiros</li> <li>Ótica</li> <li>Pet Shops</li> <li>Restaurantes</li> </ul> </div>'),a.put("views/sucesso.html","sucesso"),a.put("views/team.html",'<div class="jumbotron"> <div class="container"> <div class="row"> <div class="col-md-12"> <p><a class="btn btn-lg btn-success" ng-href="/time/estabelecimentos">Estabelecimentos</a></p> <p><a class="btn btn-lg btn-success" ng-href="/time/profissionais">Profissionais</a></p> </div> </div> </div> </div>'),a.put("views/team_places.html",'<div class="container"> <div class="row" ng-repeat="place in places.result" ng-if="$even"> <div class="col-xs-6 col-md-6"> <div class="panel panel-success"> <div class="panel-heading">{{places.result[$index].title}}</div> <div class="panel-body text-center"><img ng-src="/images/{{places.result[$index].image}}.svg" style="height:80px"></div> </div> </div> <div class="col-xs-6 col-md-6"> <div class="panel panel-success"> <div class="panel-heading">{{places.result[$index + 1].title}}</div> <div class="panel-body text-center"><img ng-src="/images/{{places.result[$index + 1].image}}.svg" style="height:80px"></div> </div> </div> </div> </div>'),a.put("views/team_professionals.html",'<div class="jumbotron"> <div class="container"> <div class="row"> <div class="col-md-6"> </div> <div class="col-md-6"> </div> </div> </div> </div>')}]);