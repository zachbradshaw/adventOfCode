use std::env;
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn main() {
    let args: Vec<String> = env::args().collect();
    let file_path = &args[1];
    let alphabet: Vec<char> = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        .chars()
        .collect();

    let mut total = 0;
    if let Ok(lines) = read_lines(file_path) {
        for line in lines {
            if let Ok(ip) = line {
                let line_length = ip.chars().count();
                let compartments = ip.split_at(line_length / 2);
                let mut found = false;
                for char in compartments.0.chars() {
                    if compartments.1.contains(char) && !found {
                        total += alphabet.iter().position(|&r| r == char).unwrap() + 1;
                        found = true;
                    }
                }
            }
        }
    }
    println!("Part one: {}", total)
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
