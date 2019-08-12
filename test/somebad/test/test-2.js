process.exitCode = 1;
console.log(`
TAP version 13
1..6
ok 1 this
ok 2 test
ok 3 file
ok 4 works
not ok 5 not as well

# fail
`.trim());
