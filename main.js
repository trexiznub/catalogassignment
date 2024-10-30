// Sample JSON data
const data = {
    "test_cases": [
        {
            "keys": {
                "n": 4,
                "k": 3
            },
            "1": {
                "base": "10",
                "value": "4"
            },
            "2": {
                "base": "2",
                "value": "111"
            },
            "3": {
                "base": "10",
                "value": "12"
            },
            "6": {
                "base": "4",
                "value": "213"
            }
        },
        {
            "keys": {
                "n": 10,
                "k": 7
            },
            "1": {
                "base": "6",
                "value": "13444211440455345511"
            },
            "2": {
                "base": "15",
                "value": "aed7015a346d63"
            },
            "3": {
                "base": "15",
                "value": "6aeeb69631c227c"
            },
            "4": {
                "base": "16",
                "value": "e1b5e05623d881f"
            },
            "5": {
                "base": "8",
                "value": "316034514573652620673"
            },
            "6": {
                "base": "3",
                "value": "2122212201122002221120200210011020220200"
            },
            "7": {
                "base": "3",
                "value": "20120221122211000100210021102001201112121"
            },
            "8": {
                "base": "6",
                "value": "20220554335330240002224253"
            },
            "9": {
                "base": "12",
                "value": "45153788322a1255483"
            },
            "10": {
                "base": "7",
                "value": "1101613130313526312514143"
            }
        }
    ]
};

// Function to parse a single test case and return the points and k value
function parseTestCase(testCase) {
    const points = [];
    const { n, k } = testCase.keys;

    for (let key in testCase) {
        if (key !== 'keys') {
            const x = parseInt(key);
            const base = parseInt(testCase[key].base);
            const value = testCase[key].value;
            const y = parseInt(value, base);
            points.push({ x, y });
        }
    }

    return { points, k };
}

// Lagrange interpolation to find the constant term
function lagrangeInterpolation(points, k) {
    let constantTerm = 0;
    
    for (let i = 0; i < k; i++) {
        let { x: xi, y: yi } = points[i];
        let term = yi;

        for (let j = 0; j < k; j++) {
            if (j !== i) {
                const { x: xj } = points[j];
                term *= xj / (xj - xi);
            }
        }

        constantTerm += term;
    }

    return Math.round(constantTerm);
}

// Main function to calculate the secret for all test cases
function main() {
    data.test_cases.forEach((testCase, index) => {
        const { points, k } = parseTestCase(testCase);
        const secret = lagrangeInterpolation(points, k);
        console.log(`The constant term (secret) for Test Case ${index + 1} is:`, secret);
    });
}

main();
