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
    let mut groups: Vec<Vec<String>> = Vec::new();

    // Split elves up into groups of 3
    if let Ok(lines) = read_lines(file_path) {
        let mut group: Vec<String> = Vec::new();
        for line in lines {
            if let Ok(ip) = line {
                if group.len() < 3 {
                    group.push(ip);

                    if group.len() == 3 {
                        groups.push(group.drain(..).collect());
                    }
                }
            }
        }
    }

    for g in groups.iter() {
        let mut found = false;

        while !found {
            for char in g[0].chars() {
                if g[1].contains(char) && g[2].contains(char) && !found {
                    total += alphabet.iter().position(|&r| r == char).unwrap() + 1;
                    found = true;
                }
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
