/**
 * Utility script to validate "Agent Clean Code" physical limits.
 * Audits files and functions across multiple languages to ensure they fit agent reasoning windows.
 *
 * C#/Java/C++: Uses regex-based method signature detection + brace depth tracking.
 * Python: Uses indentation-based detection.
 */

const fs = require('fs');
const path = require('path');

// Default Thresholds
let FILE_LIMIT = 500;
let FUNC_LIMIT = 20;

// Configuration based on command line args: --file-limit=500 --func-limit=20
process.argv.forEach(val => {
    if (val.startsWith('--file-limit=')) FILE_LIMIT = parseInt(val.split('=')[1]);
    if (val.startsWith('--func-limit=')) FUNC_LIMIT = parseInt(val.split('=')[1]);
});

// Added .cs for C# support
const SUPPORTED_EXTENSIONS = ['.js', '.ts', '.tsx', '.py', '.java', '.cpp', '.cs', '.rb', '.go', '.rs'];

let stats = {
    filesChecked: 0,
    fileLimitViolations: 0,
    funcLimitViolations: 0
};

/**
 * C#/Java/C++ method detection.
 * Matches lines like: public void Foo(, private int Bar(string x), protected Task<T> Baz() async
 * Uses a regex to find method signatures, then tracks brace depth from the opening '{'.
 * Skips: constructors (no return type), property getters/setters, class declarations, if/for/while blocks.
 */
function analyzeCSharpLike(lines) {
    const violations = [];

    // Regex: optional access modifier + return type + method name + (
    // We look for lines that have a method-like signature before the opening brace
    const methodSigPattern = /^(?:(public|private|protected|internal|static|virtual|override|abstract|sealed|new|async|unsafe|extern|readonly|volatile|explicit|implicit|params|out|ref|params|new|sealed|override|virtual|abstract|static|readonly|volatile|extern|unsafe|explicit|implicit|params|out|ref)\s+)*/;

    // More targeted: look for a return type (not void/class/interface/enum/struct/namespace) followed by identifier and (
    // We detect method starts by finding a line matching: modifiers + (type or void) + methodName + (
    // Then we find the { that belongs to it (may be on next line)

    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        // Skip comments, preprocessor directives, empty lines, using/namespace
        if (trimmed === '' || trimmed.startsWith('//') || trimmed.startsWith('#') ||
            trimmed.startsWith('using ') || trimmed.startsWith('namespace ')) {
            i++;
            continue;
        }

        // Detect a method signature: starts with access modifier or static/async etc., has a type, then method name, then (
        // Pattern: [modifiers] [returnType] methodName (
        // We reject: class, interface, enum, struct, namespace, if, for, while, switch, try, catch, finally, do, using, lock, fixed
        const methodMatch = trimmed.match(/^(?:(public|private|protected|internal|static|virtual|override|abstract|sealed|new|async|unsafe|extern|readonly|volatile|explicit|implicit|params|out|ref)\s+)*(?:void|int|string|bool|long|short|byte|float|double|decimal|char|object|DateTime|Task|Task<|IEnumerable|IList|List|Dictionary|HashSet|KeyValuePair|Tuple|Tuple<|Action|Func|Predicate|Event|Color|Brush|Pen|Font|Size|Point|Rectangle|Stream|Memory|Span|Range|Index|Type|Guid|Uri|Exception|string\[\]|List<|IList<|Dictionary<|HashSet<|IEnumerable<|string\?|int\?|long\?|bool\?|double\?|float\?|decimal\?|char\?|DateTime\?|Guid\?|byte\?|short\?|ushort\?|uint\?|ulong\?|sbyte\?)(.*)/);

        if (methodMatch) {
            const rest = methodMatch[2].trim();
            // Check that this isn't a class/interface/enum/struct/namespace/if/for/while/switch/try
            const rejectKeywords = ['class ', 'interface ', 'enum ', 'struct ', 'namespace ', 'if (', 'if(',
                'for (', 'for(', 'while (', 'while(', 'switch (', 'switch(', 'try {', 'try{',
                'catch ', 'finally ', 'do ', 'lock ', 'fixed ', 'using (', 'using('];
            const isRejected = rejectKeywords.some(kw => rest.startsWith(kw) || trimmed.includes(' ' + kw));

            if (!isRejected) {
                // Find the opening brace — could be on this line or the next
                let braceLine = i;
                while (braceLine < lines.length && !lines[braceLine].includes('{')) {
                    braceLine++;
                }

                if (braceLine < lines.length) {
                    // Track brace depth from this opening brace
                    let depth = 0;
                    let startLine = i + 1; // 1-indexed
                    let foundEnd = false;

                    for (let j = braceLine; j < lines.length; j++) {
                        const l = lines[j];
                        for (let c = 0; c < l.length; c++) {
                            if (l[c] === '{') depth++;
                            else if (l[c] === '}') depth--;
                        }

                        if (depth === 0) {
                            const length = (j + 1) - startLine + 1;
                            if (length > FUNC_LIMIT) {
                                violations.push({ line: startLine, length });
                            }
                            foundEnd = true;
                            i = j + 1;
                            break;
                        }
                    }

                    if (!foundEnd) {
                        i = braceLine + 1;
                    }
                    continue;
                }
            }
        }

        i++;
    }

    return violations;
}

/**
 * Heuristic to detect function length in indentation-based languages (Python)
 */
function analyzeIndentationLogic(lines) {
    const violations = [];
    let currentFunc = null;

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('def ') || trimmed.startsWith('class ')) {
            const indent = line.search(/\S/);
            currentFunc = { startLine: index + 1, indent: indent };
        } else if (currentFunc && trimmed !== '') {
            const indent = line.search(/\S/);
            if (indent <= currentFunc.indent && indent !== -1) {
                const length = index - currentFunc.startLine;
                if (length > FUNC_LIMIT) {
                    violations.push({ line: currentFunc.startLine, length });
                }
                currentFunc = null;
            }
        }
    });
    return violations;
}

function checkFile(filePath) {
    const ext = path.extname(filePath);
    if (!SUPPORTED_EXTENSIONS.includes(ext)) return;

    stats.filesChecked++;
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let fileViolations = [];

    // Check File Length
    if (lines.length > FILE_LIMIT) {
        stats.fileLimitViolations++;
        console.warn(`\x1b[33m[!] FILE TOO LONG\x1b[0m: ${filePath} (${lines.length} lines)`);
    }

    // Check Function Lengths
    if (ext === '.py') {
        fileViolations = analyzeIndentationLogic(lines);
    } else if (ext === '.cs') {
        // C# uses regex-based method signature detection
        fileViolations = analyzeCSharpLike(lines);
    } else {
        // Java, C++, JS/TS, Go, Rust — fall back to simple brace logic (less accurate but acceptable)
        fileViolations = analyzeBraceLogic(lines);
    }

    fileViolations.forEach(v => {
        stats.funcLimitViolations++;
        console.warn(`  \x1b[31m[-] LONG BLOCK/METHOD\x1b[0m at line ${v.line} (${v.length} lines)`);
    });
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Skip common build/dependency directories
            if (file !== 'node_modules' && file !== '.git' && file !== 'bin' && file !== 'obj') {
                walk(fullPath);
            }
        } else {
            checkFile(fullPath);
        }
    });
}

// Main Execution
const target = process.argv[2] || '.';
console.log(`\x1b[36m--- Agent Clean Code Audit ---\x1b[0m`);
console.log(`Target: ${target} | Func Limit: ${FUNC_LIMIT} | File Limit: ${FILE_LIMIT}\n`);

try {
    if (fs.statSync(target).isDirectory()) {
        walk(target);
    } else {
        checkFile(target);
    }
} catch (err) {
    console.error(`Error accessing target: ${err.message}`);
    process.exit(1);
}

console.log(`\n\x1b[36m--- Summary ---\x1b[0m`);
console.log(`Files scanned: ${stats.filesChecked}`);
console.log(`File limit violations: ${stats.fileLimitViolations}`);
console.log(`Function/Block limit violations: ${stats.funcLimitViolations}`);

if (stats.fileLimitViolations === 0 && stats.funcLimitViolations === 0) {
    console.log(`\x1b[32m✔ Codebase is Agent-Ready!\x1b[0m`);
} else {
    console.log(`\x1b[31m✘ Improvements needed for optimal agent performance.\x1b[0m`);
}
