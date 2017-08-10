<?php
    include_once('./lib.php');

    echo "ANAGRAMS " . BR;
    function anagrams($word, $possible_anagrams){
        $lettersWord = str_split($word);
        $true_anagrams = [];

        foreach($possible_anagrams as $posible_anagram) {
            if( strlen($word) != strlen($posible_anagram) || $posible_anagram == $word)
                continue;

            $posible_anagram_letters = str_split($posible_anagram);

            foreach($lettersWord as $letter) {
                $index = strpos($posible_anagram, $letter);
                if($index !== false){
                    unset($posible_anagram_letters[$index]);
                }else
                {
                    break;
                }
            }
            if(empty($posible_anagram_letters)){
                /*  podria validarse que no se encuentre ya entre los verdaderos anagramas. */
                array_push($true_anagrams, $posible_anagram);
            }

        }
        return $true_anagrams;
    }

    vd( anagrams("hola", Array('aloh','aloh', 'jasdfsa', 'hhhh', 'hola', 'loha', '' )) );
    // anagrams("hola", Array('aloh', 'jasdfsa'));

    echo "FROG JUMP";
    function frog_jump($x, $y, $d){
        $jumps = 0;
        while($x < $y){
            $jumps++;
            $x += $d;
        }
        return $jumps;
    }

    vd( frog_jump(10,85,30) );
    vd( frog_jump(0,100,10) );
    vd( frog_jump(0,0,10) );


?>
