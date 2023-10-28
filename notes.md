## Notes go here
I 🫀 this  
also now I know how to resolve merge conflicts

SSH
- I now have a BYU and home IP with SSH access.

Domain name
- Those were some really long terms and conditions.
- I added the public IP and wildcard records.

CSS
- Rule: selector {property:value; another declaration;}

JS
- Async/await: you can make a self-invoking function to avoid some problems when it's inside a promise.
For example:
```
async press(volume = 1.0) {
    return new Promise((pressResolve) => {
      (async () =>{
        this.paint(50);
        await this.playSound(volume);
        this.paint(5);
        pressResolve();
        }
      )()
    });
}
```

### Deployment
#### HTML
- deployFiles.sh works as is for both the startup and Simon&reg;
- This isn't too bad :)
#### CSS
Todo:
- Consistent page design
Learned:
- Border-box sizing helps an element keep track of its padding/border/margin with width and height dimensions
- Mobile browsers might shrink the body width on even a professional website
#### JS
Here's what it will take:
- Login
- Idea handling
- Progress handling
- Calendar placeholder
