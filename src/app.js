require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap-sass');
require('jquery');
require('featherlight');
require('featherlight/release/featherlight.min.css');

require('./styles/app.scss');
var content = require('./content.js');

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function rebuild() {
    shuffle(content.contents);
    let idx = 0;

    $('#maintable td').each(function() {
        let item = content.contents[idx++];
        $(this).html('<div class="text">'+item.text+'</div><div class="q" data-featherlight="args/'+item.file+'.html">?</div>');
    });

    $('.q').featherlight();
}

function detectBingo() {
    // horizontal
    let isbingo = $("#maintable tr:nth-child(1) td.selected").length == 5 ||
        $("#maintable tr:nth-child(2) td.selected").length == 5 ||
        $("#maintable tr:nth-child(3) td.selected").length == 5 ||
        $("#maintable tr:nth-child(4) td.selected").length == 5 ||
        $("#maintable tr:nth-child(5) td.selected").length == 5;

    // vertical
    isbingo |= $("#maintable tr td.selected:nth-child(1)").length == 5 ||
        $("#maintable tr td.selected:nth-child(2)").length == 5 ||
        $("#maintable tr td.selected:nth-child(3)").length == 5 ||
        $("#maintable tr td.selected:nth-child(4)").length == 5 ||
        $("#maintable tr td.selected:nth-child(5)").length == 5;

    // diagonal
    let d1 = 0, d2 = 0;

    for( let i = 1; i <= 5; i++ ) {
        d1 += $("#maintable tr:nth-child(" + i + ") td:nth-child(" + i + ")").hasClass("selected") ? 1 : 0;
        d2 += $("#maintable tr:nth-child(" + i + ") td:nth-child(" + (6-i) + ")").hasClass("selected") ? 1 : 0;
    }

    isbingo |= d1 === 5 || d2 === 5;

    $("#bingo").toggleClass("hidden", !isbingo);
}

$(document).ready(function() {
    rebuild();

    $("#maintable td").click(function() {
        $(this).toggleClass("selected");
        detectBingo();
    });

    $("#maintable .q").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
});
