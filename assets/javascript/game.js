$(document).ready(function () {
    // let's make some variables we're gonna need for the game
    var gameStep = 1;
    var baseAttack;
    var playerHP;
    var counterAttack;
    var enemyHP;
    var enemiesToBattle = 0;
    var totalAttack = 0;
    var enemiesDefeated = 0;
    $(".character").on("click", function () {
        //this first if statement moves the player character to the player side of the battlefield and saves their data
        if (gameStep == 1) {
            var playerHPString = $(this).attr("hp");
            var baseAttackString = $(this).attr("base-attack");
            playerHP = parseInt(playerHPString);
            baseAttack = parseInt(baseAttackString);
            $(this).addClass("player-choice");
            $(this).prependTo("#player");
            $("#char-text").text("Choose Your Opponent");
            gameStep = 2;
        }
        //this will move the selected opponent to their side, collect their information, and remove the fighter div once they have all been moved out
        else if (gameStep == 2) {
            if ($(this).hasClass("player-choice") === false) {
                var enemyHPString = $(this).attr("hp");
                var counterAttackString = $(this).attr("counter-attack");
                enemyHP = parseInt(enemyHPString);
                counterAttack = parseInt(counterAttackString);

                $(this).prependTo("#opponent");
                $("#fight-holder").removeClass("hide");
                enemiesToBattle++;
                if (enemiesToBattle == 3) {
                    $("#char-select").addClass("hide");
                }
                $("#char-text").text("Opponents Remaining");
                gameStep = 3;
            }
        }
    });

    $("#fight-button").on("click", function () {
        if (gameStep == 3) {
            totalAttack += baseAttack;
            enemyHP -= totalAttack;
            $("#opponent").find(".hp-number").text(enemyHP);
            $("#player-attack").text("You hit your opponent for " + totalAttack + " damage!")
            $("#player-attack").removeClass("hide");
            if (enemyHP <= 0) {
                $("#opponent").find(".hp-number").text("0");
                $("#opponent").children(".character").appendTo("#defeated-portrait");
                $("#defeated-enemies").removeClass("hide");
                $("#enemy-attack").addClass("hide");
                enemiesDefeated++;
                $("#char-text").text("Choose Your Opponent");
                if (enemiesDefeated == 3) {
                    $("#player").children(".character").appendTo("#player-portrait-win");
                    $("#endgame-message").text("You have destroyed your enemies and prevailed. Congratulations!")
                    $("#battlefield").addClass("hide");
                    $("#endgame").removeClass("hide");
                    return gameStep = 4;

                }
                else {
                    return gameStep = 2;
                }
            }
            playerHP -= counterAttack;
            $("#player").find(".hp-number").text(playerHP);
            $("#enemy-attack").text("Your opponent hit you back for " + counterAttack + " damage!")
            $("#enemy-attack").removeClass("hide");
            if (playerHP <= 0) {
                $("#player").find(".hp-number").text("0");
                $("#player").children(".character").appendTo("#player-portrait-loss");
                $("#endgame-message").text("You have been destroyed.")
                $("#battlefield").addClass("hide");
                $("#endgame").removeClass("hide");
                $("#char-select").addClass("hide");
                return gameStep = 4;
            }
        }
    });

    $("#new-battle").on("click", function () {
        if (gameStep == 4) {
            location.reload();
        }
    });
});