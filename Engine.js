var Engine = {
    un_pre:['','K','M','B','T','Qa','Qi','Sx','Sp','Oc','No'],
    m_pre:['', 'U','D','T','Qa','Qi','Sx','Sp','Oc','No'],
    base_pre:['D','V','Tr','Qdr','Qidr','Sxdr','Spdr','Ocdr','Nodrn','inf'],
    coins: 0,glb_mult:1,_coin_inc_ps:0,coins_pc:1,shop: [],dec_rem:2,
    purch_am:1,
    pets:[],
    TranslateValue: function(num) {
        let z=Math.max(0,Math.floor(Math.log10(num)/3));
        let prf = '';
        if (z<this.un_pre.length) {
            prf = this.un_pre[z];
        } else {
            let dx=z%this.m_pre.length;
            let bx=Math.floor(z/this.m_pre.length);
            if (dx-1 == 0) {
                prf=this.base_pre[bx-1];
            } else {
                prf=this.m_pre[dx-1]+this.base_pre[bx-1].toLowerCase();
            }
        }
        return (Engine._rdec(num/(10**(3*z)),10**this.dec_rem))+(prf);
    },
    _rdec: function (n, d) {
        return Math.round(n*d)/d;
    },
    update: function(FPS) {
        this.coins += (this._coin_inc_ps * this.glb_mult) / FPS;

        for (let i = 0; i < this.pets.length; i++) {
            let p = this.pets[i];

            p.tick++;

            if (p.tick >= p.am) {
                p.exec();
                p.tick=0;
            }
        }
    },
    purchaseItem:function(id){
        console.log(this.shop[id]);
        let n = 0;
        while (n < this.purch_am && this.coins >= this.shop[id].price) {
            if (this.shop[id].s_ele != void 0) {
                this.shop[id].onPurchase();
                this.coins -= this.shop[id].price;
                this.shop[id].price*=this.shop[id]._priceInc;
                this.shop[id].amount++;
                this.shop[id].s_ele.innerHTML = `<div>
                <span id='shp_name'>${this.shop[id].name}</span><br>
                <span id='shp_name'>Price: ${Engine.TranslateValue(this.shop[id].price)}</span><br>
                <span>Purchased: ${Engine.TranslateValue(this.shop[id].amount)}</span>
                </div>`;
            } else {
                break;
            }
            n++;
        }
    },
    click:function(e){
        this.coins+=this.coins_pc;
    },
    _ld_shop: function() {
        let bx = document.getElementById('s_items');
        for (let i = 0; i < this.shop.length; i++) {
            let item = this.shop[i];
            let par = document.createElement('li');
            let html = `
            <div>
            <span id='shp_name'>${item.name}</span><br>
            <span id='shp_name'>Price: ${this.TranslateValue(item.price)}</span><br>
            <span>Purchased: ${this.TranslateValue(item.amount)}</span>
            </div>
            `;

            par.innerHTML = html;
            par.id='s_item_'+item.id;
            par.classList.add('s_item');
            par.setAttribute('onclick','Engine.purchaseItem('+(item.id)+')');
            this.shop[i].s_ele=par;
            bx.appendChild(par);
        }
    }
}
var ShopObject = function(price, onPurchase, priceInc, name, desc, purch_desc, id) {
    this.price = price;
    this.id=id;
    this.onPurchase = onPurchase;
    this._priceInc = priceInc;
    this.name = name;
    this.desc = desc;
    this.purch_desc = purch_desc;
    this.amount=0;
}

let s_id = 0;

Engine.shop.push(new ShopObject(
    price,
    function(){
    //purchase stuff

    },
    princeIncrement,
    name,
    description,
    purchaseDescription
    ,id++));

window.onload = function() {
    Engine._ld_shop();
}
