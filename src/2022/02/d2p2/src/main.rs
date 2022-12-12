use std::env;
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

struct GameShape {
    value: u32,
    symbol: Vec<String>,
    beats: Vec<String>,
}

impl std::fmt::Display for GameShape {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(
            f,
            "(value: {}, symbol: {:?}, beats: {:?})",
            self.value, self.symbol, self.beats
        )
    }
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let file_path = &args[1];

    let game_shapes = vec![
        // rock
        GameShape {
            value: 1,
            symbol: vec!["A".to_string(), "X".into()],
            beats: vec!["C".to_string(), "Z".into()],
        },
        // paper
        GameShape {
            value: 2,
            symbol: vec!["B".to_string(), "Y".into()],
            beats: vec!["A".to_string(), "X".into()],
        },
        // scissors
        GameShape {
            value: 3,
            symbol: vec!["C".to_string(), "Z".into()],
            beats: vec!["B".to_string(), "Y".into()],
        },
    ];

    let mut total = 0;
    if let Ok(lines) = read_lines(file_path) {
        for line in lines {
            if let Ok(ip) = line {
                let mut score = 0;
                let round_shapes = ip.split(" ").collect::<Vec<&str>>();

                let opp = round_shapes[0];
                let mut me = round_shapes[1];

                let opp_shape = game_shapes
                    .iter()
                    .find(|&x| x.symbol.iter().any(|e| e == opp))
                    .unwrap();

                if me == "X" {
                    me = &opp_shape.beats[0];
                } else if me == "Y" {
                    me = opp;
                } else if me == "Z" {
                    me = &game_shapes
                        .iter()
                        .find(|&x| x.beats.iter().any(|e| e == opp))
                        .unwrap()
                        .symbol[0];
                }

                let me_shape = game_shapes
                    .iter()
                    .find(|&x| x.symbol.iter().any(|e| e == me))
                    .unwrap();

                score += me_shape.value;

                if me_shape.beats.iter().any(|e| e == opp) {
                    score += 6
                }

                if opp_shape.value == me_shape.value {
                    score += 3;
                }

                total += score;
            }
        }
    }
    println!("Part two: {}", total);
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
