//generate random password

const { isNull } = require('util')

function pwGen(){
    // requires
    const sha256 = require('js-sha256').sha256
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    // initialize variables for building password

    // initialize constants for building pseudo-random character component of password 
    const upperChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    const lowerChars = upperChars.map(char => char.toLowerCase())
    const specChars = ["!","@","#","$","^","&","*","?","'","(",")"]
    const chars = upperChars.concat(lowerChars, specChars)
    
    // initialize constants for building SHA256 hash component of password 
    const date = Date.now()
    const dateString = date.toString()
    const shaHash = sha256(dateString)

    // initialize variables for iterating characters into password components and the final password
    let pwChars = []
    let charString = ""
    let charIndex = 0
    let hashIndex = 0
    let sha25 = ""
    let pw = ""
    let pwLength
    let totalNumChars = upperChars.length * 2 + specChars.length
    let ogLength
    
    // use readline functon to get password length from user
    readline.question('******************\nWelcome to PW-Gen \n******************\n\nPasswords must be between 5 and 50 characters \nDefault password length is 12 \n\nPlease enter the desired length of your password: ', length => {
        if(Number(length) === 0){
            pwLength = 6
            ogLength =12
        } else {
            pwLength = Math.ceil(length / 2)
            ogLength = length
        }
        if(Number(length) > 0 && Number(length) < 5 || Number(length) > 50 || isNaN(Number(length))) {
            console.log('Please enter a number between 6 and 50: ')
            readline.close()
            pwGen()
        } else {
            // function to build pseudo-random array characters
                function buildCharString(){
                    for(i = 0; i < pwLength; i++) {
                        let x = Math.floor(Math.random() * totalNumChars)
                        pwChars.push(chars[x])
                    }
                    // make the pseudo-random array of characters a string with no commas
                    while(charIndex < pwChars.length){
                        charString += pwChars[charIndex]
                        charIndex++    
                    }    
                    //console.log('charString:' + charString)
                }
                // run 
                buildCharString()
            
                // check that charSting includes special characters, re-run buildCharString and re-check if not
                function specCheck(){
                    let check = 0
                    for(i = 0; i < specChars.length; i++) {
                        if(charString.includes(specChars[i])){
                            check += 1
                        }
                    }
                    if(check > 0){
                        return
                    } else {
                        charString = ""
                        buildCharString()
                    }
                }
                // run secial character check 
                specCheck()
                // make a new string of characters from the SHA256 hash
                while(hashIndex < 25){
                    sha25 += shaHash[hashIndex]
                    hashIndex++
                }
                
                // alternately select from charString and sha25 to build final password 
                for(i = 0; i < pwLength; i++) {
                        pw += charString[i]
                        pw += sha25[i]
                    }
                
                // check if pw is to long
                if(ogLength % 2 !== 0) {
                    pw = pw.slice(0, -1)
                }
                
                readline.close()
        
                // print final password 
                console.log("******************\nHere is your randomly generated password: \n" + pw +"\n******************")
            }
        })
}

pwGen()