"use strict";angular.module("clientApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!0),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/quem_somos",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/time",{templateUrl:"views/team.html"}).when("/time/estabelecimentos",{templateUrl:"views/team_places.html",controller:"PlacesCtrl",controllerAs:"places"}).when("/time/estabelecimentos/categoria",{templateUrl:"views/empresas_lista.html",controller:"PlacesCtrl",controllerAs:"places"}).when("/time/profissionais",{templateUrl:"views/team_professionals.html",controller:"ProfessionalsCtrl",controllerAs:"professionals"}).when("/time/profissionais/categoria",{templateUrl:"views/profissionais.html",controller:"ProfessionalsCtrl",controllerAs:"professionals"}).when("/cadastro",{templateUrl:"views/cadastro.html",controller:"CadastroCtrl",controllerAs:"cadastro"}).when("/fale_conosco",{templateUrl:"views/faleconosco.html",controller:"ContatoCtrl",controllerAs:"contato"}).otherwise({redirectTo:"/"})}]),angular.module("clientApp").controller("MainCtrl",["$http",function(a){var b=new IdealImageSlider.Slider({selector:"#slider",height:300,interval:4e3});b.start()}]),angular.module("clientApp").controller("AboutCtrl",["$http",function(a){var b=a.get("/api/quem_somos"),c=this;c.active=!0,b.then(function(a){c.result=a.data}),b["catch"](function(a){console.log(a)})}]),angular.module("clientApp").controller("TeamCtrl",["$http",function(a){}]),angular.module("clientApp").controller("PlacesCtrl",["$http","$routeParams",function(a,b){var c=this;this.load=function(){var b=a.get("/api/team/places");b.then(function(a){c.result=a.data}),b["catch"](function(a){console.log(a)})},this.carregarLugares=function(){var d=a.get("/api/team/places/categoria?tipo="+b.tipo);d.then(function(a){c.result=a.data}),d["catch"](function(a){console.log(a)})}}]),angular.module("clientApp").controller("ProfessionalsCtrl",["$http","$routeParams",function(a,b){var c=this;this.load=function(){var b=a.get("/api/team/profissionais");b.then(function(a){c.result=a.data}),b["catch"](function(a){console.log(a)})},this.categoria=function(){var d=a.get("/api/team/profissionais/categoria?tipo="+b.tipo);d.then(function(a){c.result=a.data}),d["catch"](function(a){console.log(a)})}}]),angular.module("clientApp").controller("CadastroCtrl",["$http",function(a){var b=this;b.sucesso=!1,b.erro=!1,b.profissionalTelefones=[],b.profissional={bairros:[]},this.cadastrar=function(){var c={method:"POST",url:"/api/cadastrar",headers:{"Content-Type":"application/json"},data:{id:"",razaoSocial:b.razaoSocial,nomeFantasia:b.nomeFantasia,endereco:b.endereco,bairro:b.bairro,cidade:b.cidade,telefones:b.telefone,modalidade:b.modalidade,estrelas:5,foto:"semfoto",descricao:b.descricao,metro:b.metro,amenidades:"sem amenidades",email:b.email,facebook:b.facebook,internet:b.internet,idiomas:"sem idiomas",areaSegura:!0}};a(c).then(function(){b.sucesso=!0,b.erro&&(b.erro=!1),b.limparCampos()},function(){b.erro=!0})},this.cadastrarProfissional=function(){var c={method:"POST",url:"/api/cadastrar",headers:{"Content-Type":"application/json"},data:{id:"",nome:b.nome,descricao:b.descricaoProfissional,foto:"",contato:[{telefone:b.profissionalTelefones},{link:[{tipo:"linkedin",nome:"LinkedIn",link:b.linkedin},{tipo:"facebook",nome:"Facebook",link:b.facebookProfissional}]},{email:b.emailProfissional}],categoria:"",email:b.emailProfissional}};a(c).then(function(){b.sucesso=!0,b.erro&&(b.erro=!1),b.limparCamposProfissional()},function(){b.erro=!0})},this.adicionarBairros=function(){-1==this.profissional.bairros.indexOf(b.bairroAtendimento)&&this.profissional.bairros.push(b.bairroAtendimento)},this.adicionarTelefone=function(){-1==this.profissionalTelefones.indexOf(b.telefonesProfissional)&&this.profissionalTelefones.push(b.telefonesProfissional)},this.removerBairro=function(a){this.profissional.bairros.splice(a,1)},this.removerTelefone=function(a){this.profissionalTelefones.splice(a,1)},this.limparCampo=function(a){"bairroAtendimento"===a&&(b.bairroAtendimento=""),"telefonesProfissional"===a&&(b.telefonesProfissional="")},this.limparCampos=function(){b.razaoSocial="",b.nomeFantasia="",b.endereco="",b.bairro="",b.cidade="",b.telefone="",b.modalidade="",b.descricao="",b.metro="",b.email="",b.facebook="",b.internet=""},this.limparCamposProfissional=function(){b.nome="",b.profissionalTelefones.splice(0,b.profissionalTelefones.length),b.profissional.bairros.splice(0,b.profissional.bairros.length),b.facebookProfissional="",b.linkedin="",b.emailProfissional="",b.descricaoProfissional=""},this.aba=function(a){"1"===a&&(b.abaEmpresa=!0,b.abaProf=!1),"2"===a&&(b.abaProf=!0,b.abaEmpresa=!1)}}]),angular.module("clientApp").controller("ContatoCtrl",["$http",function(a){var b=this;b.sucesso=!1,b.erro=!1,this.enviar=function(){var c={method:"POST",url:"/api/fale_conosco",headers:{"Content-Type":"application/json"},data:{nome:b.nome,email:b.email,mensagem:b.mensagem}};a(c).then(function(){b.sucesso=!0,b.erro&&(b.erro=!1),b.limparCampos()},function(){b.erro=!0})},this.limparCampos=function(){b.nome="",b.email="",b.mensagem=""}}]),angular.module("clientApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="jumbotron"> <h2>{{about.result.title}}</h2> <p class="lead"> <img src="images/logo.png" alt="Service Rio"><br> {{about.result.description}} </p> </div>'),a.put("views/cadastro.html",'<div class="col-md-12 col-xs-12 col-lg-12"> <div class="alert alert-success fade in" ng-show="cadastro.sucesso"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Obrigado por se cadastrar! Entraremos em contato rapidamente para ativar seu perfil.</strong> </div> <div class="alert alert-danger fade in" ng-show="cadastro.erro"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Desculpe! Houve um erro ao processar sua solicitação. Pode tentar novamente clicando no botão Cadastrar.</strong> </div> <ul class="nav nav-tabs"> <li ng-class="{\'active\': cadastro.abaEmpresa}"><a ng-click="cadastro.aba(\'1\')">Empresas</a></li> <li ng-class="{\'active\': cadastro.abaProf}"><a ng-click="cadastro.aba(\'2\')">Profissionais</a></li> </ul> <div ng-show="cadastro.abaEmpresa" ng-init="cadastro.abaEmpresa = true"> <form class="form-group" action="/api/cadastro" method="post"> <div class="form-group"> <label for="razaosocial">Razão Social</label> <input type="text" name="razaosocial" class="form-control" id="razaosocial" ng-model="cadastro.razaoSocial" placeholder="Informe a razão social"> </div> <div class="form-group"> <label for="nomefantasia">Nome Fantasia</label> <input type="text" name="nomefantasia" class="form-control" id="nomefantasia" ng-model="cadastro.nomeFantasia" aria-describedby="nomefantasia" placeholder="Informe o nome fantasia"> </div> <div class="form-group"> <label for="endereco">Endereço</label> <input type="text" name="endereco" class="form-control" id="endereco" ng-model="cadastro.endereco" aria-describedby="endereco" placeholder="Informe o endereço"> </div> <div class="form-group"> <label for="bairro">Bairro</label> <input type="text" name="bairro" class="form-control" id="bairro" ng-model="cadastro.bairro" aria-describedby="bairro" placeholder="Informe o bairro"> </div> <div class="form-group"> <label for="cidade">Cidade</label> <input type="text" name="cidade" class="form-control" id="cidade" ng-model="cadastro.cidade" aria-describedby="cidade" placeholder="Informe a cidade"> </div> <div class="form-group"> <label for="telefone">Telefone</label> <input type="text" name="telefone" class="form-control" id="telefone" ng-model="cadastro.telefone" aria-describedby="telefone" placeholder="Informe o telefone de contato"> </div> <div class="form-group"> <label for="modalidade">Modalidade</label> <input type="text" name="modalidade" class="form-control" id="modalidade" ng-model="cadastro.modalidade" aria-describedby="modalidade" placeholder="Informe a modalidade do seu negócio"> </div> <div class="form-group"> <label for="metro">Metrô</label> <input type="text" name="metro" class="form-control" id="metro" ng-model="cadastro.metro" aria-describedby="metro" placeholder="Estação de metrô mais próxima"> </div> <div class="form-group"> <label for="facebook">Email</label> <input type="text" name="email" class="form-control" id="email" ng-model="cadastro.email" aria-describedby="email" placeholder="Informe seu email para contato"> </div> <div class="form-group"> <label for="facebook">Facebook</label> <input type="text" name="facebook" class="form-control" id="facebook" ng-model="cadastro.facebook" aria-describedby="facebook" placeholder="Informe sua página no Facebook"> </div> <div class="form-group"> <label for="internet">Página web</label> <input type="text" name="internet" class="form-control" id="internet" ng-model="cadastro.internet" aria-describedby="internet" placeholder="Informe sua página na Internet"> </div> <div class="form-group"> <label for="campoTexto">Descrição</label> <textarea class="form-control" name="mensagem" id="campoTexto" ng-model="cadastro.descricao" rows="3" placeholder="Uma descrição sobre a sua empresa"></textarea> </div> <button type="button" class="btn btn-success" ng-click="cadastro.cadastrar()">Cadastrar</button> </form> </div> <div ng-show="cadastro.abaProf"> <form class="form-group"> <div class="form-group"> <label for="nome">Nome</label> <input type="text" name="nome" class="form-control" id="nome" ng-model="cadastro.nome" placeholder="Informe seu nome"> </div> <label for="bairroAtendimento">Bairros que você atende</label> <div class="input-group"> <input type="text" name="bairroAtendimento" class="form-control" id="bairroAtendimento" ng-model="cadastro.bairroAtendimento" aria-describedby="bairroAtendimento" placeholder="Informe os bairros que você presta seu serviço"> <span class="input-group-btn"><button class="btn btn-success" ng-click="cadastro.adicionarBairros(); cadastro.limparCampo(\'bairroAtendimento\')">+</button></span> </div> <a class="btn btn-success" ng-repeat="bairro in cadastro.profissional.bairros" alt="Clique para remover" title="Clique para remover" ng-click="cadastro.removerBairro($index)">{{bairro}}</a> <br> <label for="telefonesProfissional">Seus telefones de contato</label> <div class="input-group"> <input type="text" name="telefonesProfissional" class="form-control" id="telefonesProfissional" ng-model="cadastro.telefonesProfissional" aria-describedby="telefonesProfissional" placeholder="Adicione seus números de contato"> <span class="input-group-btn"><button class="btn btn-success" ng-click="cadastro.adicionarTelefone(); cadastro.limparCampo(\'telefonesProfissional\')">+</button></span> </div> <ul class="list-inline"><li class="btn btn-success" style="margin-left: 5px" ng-repeat="telefoneProfissional in cadastro.profissionalTelefones" alt="Clique para remover" title="Clique para remover" ng-click="cadastro.removerTelefone($index)">{{telefoneProfissional}}</li></ul> <br> <div class="form-group"> <label for="facebookProfissional">Facebook</label> <input type="text" name="facebookProfissional" class="form-control" id="facebookProfissional" ng-model="cadastro.facebookProfissional" placeholder="Informe seu link do Facebook caso desejar"> </div> <div class="form-group"> <label for="linkedin">LinkedIn</label> <input type="text" name="linkedin" class="form-control" id="linkedin" ng-model="cadastro.linkedin" placeholder="Informe seu LinkedIn se desejar"> </div> <div class="form-group"> <label for="emailProfissional">Email</label> <input type="text" name="emailProfissional" class="form-control" id="emailProfissional" ng-model="cadastro.emailProfissional" placeholder="Informe seu email de contato se desejar"> </div> <div class="form-group"> <label for="descricaoProfissional">Descrição</label> <textarea class="form-control" name="descricaoProfissional" id="descricaoProfissional" ng-model="cadastro.descricaoProfissional" rows="3" placeholder="Uma descrição sobre você"></textarea> </div> <button type="button" class="btn btn-success" ng-click="cadastro.cadastrarProfissional()">Cadastrar</button> </form> </div> </div>'),a.put("views/empresas_lista.html",'<div class="container" ng-init="places.carregarLugares()"> <div class="row" ng-repeat="place in places.result"> <div class="panel panel-success"> <div class="panel-heading">{{place.nomeFantasia}}</div> <div class="panel-body"> <div class="row"> <div class="col-xs-4 col-md-2 col-lg-2"> <img class="img-responsive" ng-src="/images/{{place.foto}}"> </div> <div class="col-xs-8 col-md-10 col-lg-10"> {{place.descricao}} <br> {{place.endereco}} - {{place.bairro}} <br> <img src="/images/telefone.svg" class="mr-5" alt="Contato" title="Contato" width="15" height="15"><span ng-repeat="telefone in place.telefones">{{telefone}}{{$last ? \'\' : \' / \'}}</span> <br> <span ng-show="place.metro"><img title="Metro" class="mr-5" width="15" height="15" alt="Metro" src="/images/metro_rio.png">Estação do Metrô mais próxima: {{place.metro}}</span> </div> </div> </div> <div class="panel-footer footer-padding"> <img ng-repeat="amenidade in place.amenidades" class="img-thumbnail" width="40" height="40" src="/images/{{amenidade}}.svg"> <a ng-repeat="midia in place.midiaSocial" href="{{midia.link}}" target="_blank"><img class="img-thumbnail" width="40" height="40" src="/images/{{midia.midia}}.svg"></a> <img ng-repeat="idioma in place.idiomas" class="img-thumbnail" alt="Foreign language spoken" title="Foreign language spoken" width="40" height="40" src="/images/{{idioma}}.svg"> <img ng-show="place.areaSegura" class="img-thumbnail" src="/images/safe_zone.svg" width="40" height="40" title="Safe Area" alt="Safe Area"> </div> </div> </div> </div>'),a.put("views/erro.html",""),a.put("views/faleconosco.html",'<div class="col-md-12 col-xs-12 col-lg-12"> <div class="alert alert-success fade in" ng-show="contato.sucesso"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Obrigado pela sua mensagem! Entraremos em contato rapidamente.</strong> </div> <div class="alert alert-danger fade in" ng-show="contato.erro"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Desculpe! Houve um erro ao enviar sua mensagem. Pode tentar novamente clicando no botão enviar.</strong> </div> <form class="form-group" action="/api/fale_conosco" method="post"> <div class="form-group"> <label for="nome">Nome</label> <input type="text" name="nome" class="form-control" id="nome" ng-model="contato.nome" placeholder="Informe seu nome"> </div> <div class="form-group"> <label for="email">Email</label> <input type="email" name="email" class="form-control" id="email" ng-model="contato.email" aria-describedby="emailInforme" placeholder="Informe seu Email"> <small id="emailInforme" class="form-text text-muted">Nunca compartilharemos seu email com alguém.</small> </div> <div class="form-group"> <label for="campoTexto">Mensagem</label> <textarea class="form-control" name="mensagem" id="campoTexto" ng-model="contato.mensagem" rows="3"></textarea> </div> <button type="button" class="btn btn-success" ng-click="contato.enviar()">Enviar</button> </form> </div>'),a.put("views/main.html",'<div class="jumbotron"> <h1>Service Rio</h1> <p class="lead"> <img src="images/logo.png" alt="Service Rio"><br> Encontre uma infinidade de lojas e profissionais liberais de acordo com a sua necessidade </p> <!-- Right here, this guy. Note the removed Hash as well. --> <p><a class="btn btn-lg btn-success" ng-href="/time">Conheça nosso time</a></p> </div> <div id="slider"> <img data-src="/images/banner_carrossel_1.png" alt="servicerio.com banner"> <img data-src="/images/banner_carrossel_2.png" alt="servicerio.com banner"> <img data-src="/images/banner_carrossel_3.png" alt="servicerio.com banner"> <img data-src="/images/banner_carrossel_4.png" alt="servicerio.com banner"> </div> <div class="row marketing"> <div class="col-md-4 col-xs-12 col-lg-4"> <div class="panel panel-primary"> <div class="panel-heading"><h5><i class="fa fa-address-book" aria-hidden="true"></i> Seu catálogo online!</h5></div> <div class="panel-body"> <p>Buscando uma loja ou um profissional liberal?</p> <p>Aqui você encontra o tudo o que você precisa!</p> <p>Aproveite e faça seu cadastro gratuitamente!</p> </div> </div> </div> <div class="col-md-4 col-xs-12 col-lg-4"> <div class="panel panel-success"> <div class="panel-heading"><h5><i class="fa fa-facebook-square" aria-hidden="true"></i> Estamos no Facebook</h5></div> <div class="panel-body"> <p>Já curtiu nossa página?</p> <p>Saiba sobre promoções e mais informação em nossa página no Facebook.</p> <p>Tudo o que você precisa em um só lugar!</p> </div> </div> </div> <div class="col-md-4 col-xs-12 col-lg-4"> <div class="panel panel-warning"> <div class="panel-heading"><h5><i class="fa fa-info-circle" aria-hidden="true"></i> Veja o que temos:</h5></div> <div class="panel-body"> <p>Restaurantes</p> <p>Hotéis</p> <p>Eletricistas</p> <p>Academias</p> <p>e muito mais...</p> </div> </div> </div> </div> <div class="row marketing"> <h4><i class="fa fa-bullhorn" aria-hidden="true"></i> Saiba mais sobre nossos parceiros:</h4> <img class="img-thumbnail" width="40" height="40" src="/images/facebook.svg"> Veja nossa página no Facebook <br> <img class="img-thumbnail" width="40" height="40" src="/images/linkedin.svg"> Veja a página do LinkedIn <br> <img class="img-thumbnail" width="40" height="40" src="/images/internet.svg"> Veja nossa página na internet <br> <img class="img-thumbnail" width="40" height="40" src="/images/wifi.svg"> Possuímos WiFi para sua comodidade <br> <img class="img-thumbnail" width="40" height="40" src="/images/metro_rio.png"> Existe uma estação de metrô perto de nós! <br> <img class="img-thumbnail" alt="Foreign language spoken" title="Foreign language spoken" width="40" height="40" src="/images/uk.svg"> Falamos outros idiomas <br> <img class="img-thumbnail" src="/images/safe_zone.svg" width="40" height="40" title="Safe Area" alt="Safe Area"> Estamos em um lugar seguro </div>'),a.put("views/profissionais.html",'<div class="container" ng-init="professionals.categoria()"> <div class="row" ng-repeat="profissional in professionals.result"> <div class="panel panel-success"> <div class="panel-heading">{{profissional.nome}}</div> <div class="panel-body"> <div class="row"> <div class="col-xs-4 col-md-2 col-lg-2"> <img src="/images/{{profissional.foto}}" class="img-responsive"> </div> <div class="col-xs-8 col-md-10 col-lg-10"> {{profissional.descricao}} <br><br> <span ng-repeat="contato in profissional.contato"> <span ng-repeat="telefone in contato.telefone"><img src="/images/telefone.svg" class="mr-5" alt="Contato" title="Contato" width="15" height="15">{{telefone}}</span> <br> <span ng-repeat="link in contato.link"> <a href="{{link.link}}" ng-show="link.link" target="_blank"><img src="/images/{{link.tipo}}.svg" class="mr-5" alt="LinkedIn" title="LinkedIn" width="20" height="20">Clique para ver o {{link.nome}}</a> </span> </span> </div> </div> </div> <div class="panel-footer">Atende os bairros: <strong ng-repeat="bairro in profissional.bairros">{{bairro}}{{$last ? \'\' : \', \'}}</strong></div> </div> </div> </div>'),a.put("views/sucesso.html","sucesso"),a.put("views/team.html",'<div class="col-md-6 col-xs-6"> <div class="panel panel-success"> <div class="panel-heading">Estabelecimentos</div> <div class="panel-body text-center"><a class="btn btn-lg btn-success" ng-href="/time/estabelecimentos"><img ng-src="/images/store.svg" class="img-responsive" width="100" height="100"></a></div> </div> </div> <div class="col-md-6 col-xs-6"> <div class="panel panel-success"> <div class="panel-heading">Profissionais</div> <div class="panel-body text-center"><a class="btn btn-lg btn-success" ng-href="/time/profissionais"><img ng-src="/images/worker.svg" class="img-responsive" width="100" height="100"></a></div> </div> </div>'),a.put("views/team_places.html",'<div class="container" ng-init="places.load()"> <div class="row" ng-repeat="place in places.result" ng-if="$even"> <div class="col-xs-6 col-md-6"> <div class="panel panel-success"> <div class="panel-heading">{{places.result[$index].title}}</div> <div class="panel-body text-center"><a ng-href="/time/estabelecimentos/categoria?tipo={{places.result[$index].categoria}}"><img ng-src="/images/{{places.result[$index].image}}.svg" style="height:80px"></a></div> </div> </div> <div class="col-xs-6 col-md-6" ng-show="places.result[$index + 1].title"> <div class="panel panel-success"> <div class="panel-heading">{{places.result[$index + 1].title}}</div> <div class="panel-body text-center"><a ng-href="/time/estabelecimentos/categoria?tipo={{places.result[$index + 1].categoria}}"><img ng-src="/images/{{places.result[$index + 1].image}}.svg" style="height:80px"></a></div> </div> </div> </div> </div>'),a.put("views/team_professionals.html",'<div class="container" ng-init="professionals.load()"> <div class="row"> <div class="col-md-12 col-xd-12 col-lg-12"> <a class="btn btn-success" ng-repeat="profissional in professionals.result" ng-href="/time/profissionais/categoria?tipo={{profissional.categoria}}">{{profissional.title}}</a> </div> </div> </div>')}]);