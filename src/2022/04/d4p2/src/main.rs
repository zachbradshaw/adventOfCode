use std::env;
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn main() {
    let args: Vec<String> = env::args().collect();
    let file_path = &args[1];
    let mut total = 0;

    if let Ok(lines) = read_lines(file_path) {
        for line in lines {
            if let Ok(ip) = line {
                let ranges: Vec<String> = ip.split(',').map(|s| s.to_string()).collect();
                let range1: Vec<i32> = ranges[0]
                    .split("-")
                    .map(|s| s.parse::<i32>().unwrap())
                    .collect();
                let range2: Vec<i32> = ranges[1]
                    .split("-")
                    .map(|s| s.parse::<i32>().unwrap())
                    .collect();

                if range1[0] <= range2[1] && range2[0] <= range1[1] {
                    total += 1;
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
