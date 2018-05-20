/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
      alert("Consumiendo Datos...");

        //this.receivedEvent('deviceready');
        $.ajax({
          url:"https://bittrex.com/api/v1.1/public/getmarkets",
          type:"GET",
          cache:false,
          success:function(data){
            //alert("Tipo de Datos: "+typeof data);

              var TablaCompleta ="<table class='table table-hover'><caption>Valores de BITTREX</caption>"+
              "<thead><tr><th scope='col'>#</th>"+
              "<th scope='col'>MARKET</th>"+
              "<th scope='col'>MONEDA</th>"+
              "<th scope='col'>INV. MINIMA</th>"+
              "</tr></thread><tbody>";
              for (var i = 1; i < 31; i++) {
                var market=JSON.stringify(data.result[i].MarketName);
                var longMarket=market.length-2;
                var currency=JSON.stringify(data.result[i].MarketCurrencyLong);
                var longCurrency=currency.length-2;
                var last=JSON.stringify(data.result[i].MinTradeSize);
                var longLast=last.length-2;
              TablaCompleta+="<tr><td scope='col'>"+i+" </td><td scope='col'> "+market.substr(1 , longMarket)+" </td><td scope='col'> "+currency.substr(1 , longCurrency)+" </td><td scope='col'> "+last.substr(1 , longLast)+" </td></tr>";
              }
              TablaCompleta += "</tbody></table>";
              //alert(TablaCompleta);
              document.getElementById("demo").innerHTML += TablaCompleta;


          }
        });

    },

    // Update DOM on a Received Event
    /*
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    */
};

app.initialize();
