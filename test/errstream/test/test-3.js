console.log(`
TAP version 13
1..6
ok 1 this
ok 2 test
ok 3 file
ok 4 works
ok 5 via
ok 6 stdout
ok 7 which
ok 8 wins

# success
`.trim());
console.error(`
TAP version 13
1..6
ok this
ok test
ok file
ok works
ok well
`.trim());
