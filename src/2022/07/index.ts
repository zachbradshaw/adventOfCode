const file = await Deno.readTextFile(`./input.txt`);
const input = file.trim().split('\n');

const partOne = (input) => {
  const directories: { [dir: string]: { files: number; children: string[] } } =
    {};
  const totalSpace = 70000000;
  const spaceNeededForUpdate = 30000000;
  const max = 100000;
  let currentPath: string[] = [];

  input.forEach((line) => {
    const isCommand = line.charAt(0) === '$';

    // ignore ls commands
    if (isCommand && line.match(/cd/)) {
      let dest = line.split(' ')[2];

      // cd to parent dir
      if (dest === '..') {
        currentPath.pop();
        return;
      }

      currentPath.push(dest);

      // init new directory, using full path as dir name allows for a dir "a" to
      // have a nested dir "a" and still have a unique entry in a flat object
      directories[currentPath.join('')] = { files: 0, children: [] };
    }

    if (!isCommand) {
      const split_line = line.split(' ');
      if (line.match(/dir/)) {
        const name = split_line[1];
        directories[currentPath.join('')].children.push(
          `${currentPath.join('')}${name}`
        );
      } else {
        const size = split_line[0];
        directories[currentPath.join('')].files += Number(size);
      }
    }
  });

  let total = 0;
  const sizes: number[] = [];
  for (let dir in directories) {
    let size = 0;

    const loop = (d) => {
      const { files, children } = directories[d];

      size += files;

      if (children.length) {
        children.forEach((c) => {
          loop(c);
        });
      }
    };

    loop(dir);

    if (size <= max) {
      total += size;
      sizes.push(total);
    } else {
      sizes.push(size);
    }
  }

  const sortedSizes = sizes.sort((a, b) => a - b);
  const used = sortedSizes[sortedSizes.length - 1];
  const free = totalSpace - used;

  console.log('Part One:', total);
  console.log(
    'Part Two:',
    sortedSizes.find((s) => free + s >= spaceNeededForUpdate)
  );
};

partOne(input);
