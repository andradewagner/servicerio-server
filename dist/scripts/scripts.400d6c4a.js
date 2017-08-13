"use strict";angular.module("clientApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!0),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/quem_somos",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/time",{templateUrl:"views/team.html"}).when("/time/estabelecimentos",{templateUrl:"views/team_places.html",controller:"PlacesCtrl",controllerAs:"places"}).when("/time/estabelecimentos/categoria",{templateUrl:"views/empresas_lista.html",controller:"PlacesCtrl",controllerAs:"places"}).when("/time/profissionais",{templateUrl:"views/team_professionals.html",controller:"ProfessionalsCtrl",controllerAs:"professionals"}).when("/time/profissionais/categoria",{templateUrl:"views/profissionais.html",controller:"ProfessionalsCtrl",controllerAs:"professionals"}).when("/fale_conosco",{templateUrl:"views/faleconosco.html",controller:"ContatoCtrl",controllerAs:"contato"}).otherwise({redirectTo:"/"})}]),angular.module("clientApp").controller("MainCtrl",["$http",function(a){}]),angular.module("clientApp").controller("AboutCtrl",["$http",function(a){var b=a.get("/api/quem_somos"),c=this;b.then(function(a){c.result=a.data}),b["catch"](function(a){console.log(a)})}]),angular.module("clientApp").controller("TeamCtrl",["$http",function(a){}]),angular.module("clientApp").controller("PlacesCtrl",["$http","$routeParams",function(a,b){var c=this;this.load=function(){var b=a.get("/api/team/places");b.then(function(a){console.log(a.data),c.result=a.data}),b["catch"](function(a){console.log(a)})},this.carregarLugares=function(){var d=a.get("/api/team/places/categoria?tipo="+b.tipo);d.then(function(a){c.result=a.data}),d["catch"](function(a){console.log(a)})}}]),angular.module("clientApp").controller("ProfessionalsCtrl",["$http","$routeParams",function(a,b){var c=this;this.load=function(){var b=a.get("/api/team/profissionais");b.then(function(a){c.result=a.data}),b["catch"](function(a){console.log(a)})},this.categoria=function(){var d=a.get("/api/team/profissionais/categoria?tipo="+b.tipo);d.then(function(a){c.result=a.data}),d["catch"](function(a){console.log(a)})}}]),angular.module("clientApp").controller("ContatoCtrl",["$http",function(a){var b=this;b.sucesso=!1,b.erro=!1,this.enviar=function(){var c={method:"POST",url:"/api/fale_conosco",headers:{"Content-Type":"application/json"},data:{nome:b.nome,email:b.email,mensagem:b.mensagem}};a(c).then(function(){b.sucesso=!0,b.erro&&(b.erro=!1),b.limparCampos()},function(){b.erro=!0})},this.limparCampos=function(){b.nome="",b.email="",b.mensagem=""}}]),angular.module("clientApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="jumbotron"> <h2>{{about.result.title}}</h2> <p class="lead"> <img src="images/logo.png" alt="Service Rio"><br> {{about.result.description}} </p> </div>'),a.put("views/empresas_lista.html",'<div class="container" ng-init="places.carregarLugares()"> <div class="row" ng-repeat="place in places.result"> <div class="panel panel-success"> <div class="panel-heading">{{place.nomeFantasia}}</div> <div class="panel-body"> <div class="row"> <div class="col-xs-4 col-md-2 col-lg-2"> <img class="img-responsive" ng-src="/images/{{place.foto}}"> </div> <div class="col-xs-8 col-md-10 col-lg-10"> {{place.descricao}} <br> {{place.endereco}} - {{place.bairro}} <br> <img src="/images/telefone.svg" class="mr-5" alt="Contato" title="Contato" width="15" height="15"><span ng-repeat="telefone in place.telefones">{{telefone}}{{$last ? \'\' : \' / \'}}</span> <br> <span ng-show="place.metro"><img title="Metro" class="mr-5" width="15" height="15" alt="Metro" src="/images/metro_rio.png">Estação do Metrô mais próxima: {{place.metro}}</span> </div> </div> </div> <div class="panel-footer footer-padding"> <img ng-repeat="amenidade in place.amenidades" class="img-thumbnail" width="40" height="40" src="/images/{{amenidade}}.svg"> <a ng-repeat="midia in place.midiaSocial" href="{{midia.link}}" target="_blank"><img class="img-thumbnail" width="40" height="40" src="/images/{{midia.midia}}.svg"></a> <img ng-repeat="idioma in place.idiomas" class="img-thumbnail" alt="Foreign language spoken" title="Foreign language spoken" width="40" height="40" src="/images/{{idioma}}.svg"> <img ng-show="place.areaSegura" class="img-thumbnail" src="/images/safe_zone.svg" width="40" height="40" title="Safe Area" alt="Safe Area"> </div> </div> </div> </div>'),a.put("views/erro.html",""),a.put("views/faleconosco.html",'<div class="container"> <div class="alert alert-success fade in" ng-show="contato.sucesso"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Obrigado pela sua mensagem! Entraremos em contato rapidamente.</strong> </div> <div class="alert alert-danger fade in" ng-show="contato.erro"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Desculpe! Houve um erro ao enviar sua mensagem. Pode tentar novamente clicando no botão enviar.</strong> </div> <form class="form-group" action="/api/fale_conosco" method="post"> <div class="form-group row"> <label for="nome">Nome</label> <input type="text" name="nome" class="form-control" id="nome" ng-model="contato.nome" placeholder="Informe seu nome"> </div> <div class="form-group row"> <label for="email">Email</label> <input type="email" name="email" class="form-control" id="email" ng-model="contato.email" aria-describedby="emailInforme" placeholder="Informe seu Email"> <small id="emailInforme" class="form-text text-muted">Nunca compartilharemos seu email com alguém.</small> </div> <div class="form-group row"> <label for="campoTexto">Mensagem</label> <textarea class="form-control" name="mensagem" id="campoTexto" ng-model="contato.mensagem" rows="3"></textarea> </div> <button type="button" class="btn btn-success" ng-click="contato.enviar()">Enviar</button> </form> </div>'),a.put("views/main.html",'<div class="jumbotron"> <h1>Service Rio</h1> <p class="lead"> <img src="images/logo.png" alt="Service Rio"><br> Encontre uma infinidade de lojas e profissionais liberais de acordo com a sua necessidade </p> <!-- Right here, this guy. Note the removed Hash as well. --> <p><a class="btn btn-lg btn-success" ng-href="/time">Conheça nosso time</a></p> </div> <div class="row marketing"> <h4><i class="fa fa-address-book" aria-hidden="true"></i> Seu catálogo online!</h4> <p> Buscando uma loja ou um profissional liberal? </p> <p> Aqui você encontra o todo tipo de serviço: </p> <ul> <li>Loja de móveis</li> <li>Pedreiros</li> <li>Marceneiros</li> <li>Ótica</li> <li>Pet Shops</li> <li>Restaurantes</li> </ul> </div>'),a.put("views/profissionais.html",'<div class="container" ng-init="professionals.categoria()"> <div class="row" ng-repeat="profissional in professionals.result"> <div class="panel panel-success"> <div class="panel-heading">{{profissional.nome}}</div> <div class="panel-body"> <div class="row"> <div class="col-xs-4 col-md-2 col-lg-2"> <img src="/images/{{profissional.foto}}" class="img-responsive"> </div> <div class="col-xs-8 col-md-10 col-lg-10"> {{profissional.descricao}} <br><br> <span ng-repeat="contato in profissional.contato"> <span ng-repeat="telefone in contato.telefone"><img src="/images/telefone.svg" class="mr-5" alt="Contato" title="Contato" width="15" height="15">{{telefone}}</span> <br> <span ng-repeat="link in contato.link"> <a href="{{link.link}}" ng-show="link.link" target="_blank"><img src="/images/{{link.tipo}}.svg" class="mr-5" alt="LinkedIn" title="LinkedIn" width="20" height="20">Clique para ver o {{link.nome}}</a> </span> </span> </div> </div> </div> <div class="panel-footer">Atende os bairros: <strong ng-repeat="bairro in profissional.bairros">{{bairro}}{{$last ? \'\' : \', \'}}</strong></div> </div> </div> </div>'),a.put("views/sucesso.html","sucesso"),a.put("views/team.html",'<div class="jumbotron"> <div class="container"> <div class="row"> <div class="col-md-12"> <p><a class="btn btn-lg btn-success" ng-href="/time/estabelecimentos">Estabelecimentos</a></p> <p><a class="btn btn-lg btn-success" ng-href="/time/profissionais">Profissionais</a></p> </div> </div> </div> </div>'),a.put("views/team_places.html",'<div class="container" ng-init="places.load()"> <div class="row" ng-repeat="place in places.result" ng-if="$even"> <div class="col-xs-6 col-md-6"> <div class="panel panel-success"> <div class="panel-heading">{{places.result[$index].title}}</div> <div class="panel-body text-center"><a ng-href="/time/estabelecimentos/categoria?tipo={{places.result[$index].categoria}}"><img ng-src="/images/{{places.result[$index].image}}.svg" style="height:80px"></a></div> </div> </div> <div class="col-xs-6 col-md-6" ng-show="places.result[$index + 1].title"> <div class="panel panel-success"> <div class="panel-heading">{{places.result[$index + 1].title}}</div> <div class="panel-body text-center"><a ng-href="/time/estabelecimentos/categoria?tipo={{places.result[$index + 1].categoria}}"><img ng-src="/images/{{places.result[$index + 1].image}}.svg" style="height:80px"></a></div> </div> </div> </div> </div>'),a.put("views/team_professionals.html",'<div class="container" ng-init="professionals.load()"> <div class="row"> <div class="col-md-12 col-xd-12 col-lg-12"> <a class="btn btn-success" ng-repeat="profissional in professionals.result" ng-href="/time/profissionais/categoria?tipo={{profissional.categoria}}">{{profissional.title}}</a> </div> </div> </div>')}]);