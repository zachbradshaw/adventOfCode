use std::env;
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn main() {
    let args: Vec<String> = env::args().collect();
    let file_path = &args[1];

    let mut totals: Vec<i32> = Vec::new();
    if let Ok(lines) = read_lines(file_path) {
        let mut calories: Vec<i32> = Vec::new();
        for line in lines {
            if let Ok(ip) = line {
                if ip.trim().is_empty() {
                    totals.push(calories.iter().sum());
                    calories = Vec::new();
                } else {
                    calories.push(ip.trim().parse::<i32>().unwrap());
                }
            }
        }
    }
    totals.sort();
    totals.reverse();

    let top: i32 = [totals[0], totals[1], totals[2]].iter().sum();

    println!("Part two: {}", top)
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
