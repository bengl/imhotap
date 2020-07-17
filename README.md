# imhotap

This is a meta-test-framework. Point it at a set of test files and see the
output summarized for each file!

By default, `imhotap` will find files matching the glob `test/**/test*.js`, and
will run each file individually. Each file that exits with a non-zero code will
be considered a test failure. The output is presented in TAP, but you can also
use whatever reporter you'd like.

## Usage

```
$ imhotap --help
Options:
  --version          Show version number                               [boolean]
  --help             Show help                                         [boolean]
  -f, --files        glob pattern for while files to run
                                           [array] [default: "test/**/test*.js"]
  -c, --concurrency  how many test files to run in parallel (0 == Infinity)
                                                           [number] [default: 0]
  -r, --reporter     which tap reporter to use, or just `tap`
                                                       [string] [default: "tap"]
  -q, --quieter      whether or not to include subtests on success
                                                      [boolean] [default: false]
  -s, --stream       stream to expect TAP output from test files
                               [choices: "stdout", "stderr"] [default: "stdout"]
```

Without any additional options, `imhotap` will run with all the defaults.

### Selecting which files to run

The `-f/--files` options can be used to specify which files are run, using a
glob (i.e. minimatch/fnmatch) pattern. For example, to match any files in your
`test` directory, and subdirectories, ending in `.spec.js`, you might use the
option `-f test/**/*.spec.js`.

### Concurrency

It's expected that your test files can be run as separate process at the same
time. If that's not the case, or there's too much load on your computer, you can
adjust the the the number of simultaneous processes `imhotap` will spawn. For
example, `-c 1` will tell `imhotap` to run only 1 file at a time.

### Reporting

While the default is to just output TAP, you can format it using any of the
various reporter tools that convert TAP into more pleasant output using `stdin`
and `stdout`. Many can be found
[here](https://github.com/sindresorhus/awesome-tap#reporters).

To specify a reporter, use the `-r/--reporter` option. If a named reporter can't
be found on the $PATH, `imhotap` will attempt to run it using `npx`.

### Verbosity

By default, `imhotap` will assume that output from files is TAP-encoded and so
can be included as a subtest in TAP output. If this is not the case, or you'd
like more terse output, you can use the `-q/--quiet` option.

## License

MIT License. See LICENSE.txt.
