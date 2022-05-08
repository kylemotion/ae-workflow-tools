var f = File("~/Desktop/Blinky.ffx"); // Location of file to be converted on Desktop
f.encoding = 'BINARY'; // Format you're encoding it too
f.open('e'); 
 
var binary;
binary = f.read().toSource(); // accessing source of file 
 
var myFile = new File("~/Desktop/binaryOutput.txt"); // location and file format you'll be writing to
        myFile.open("w"); 
        myFile.encoding = "BINARY";
        myFile.write(binary); // converting to binary
        myFile.close(); // close file
f.close();