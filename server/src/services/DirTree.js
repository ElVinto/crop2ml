const directoryTree = require("directory-tree");

class DirTree{

    /*
        dirTree: {
          name: "file or directory name"
          path: "path on server"
          size: number
          type: "directory"|"file"

          extension: "." (if file)
          children: array of dirTree (if directory)
        }
       */

    static createDirTree = (path) =>{
        return directoryTree(path)
    }
    
    static getDirTree(path){
        return this.createDirTree(path)
    }
    
    static getDisplayedDirTree(path){
        let pathDirTree = this.createDirTree(path)
        let displayedDirTree = {}
        // this.clean(pathDirTree,displayedDirTree)
        displayedDirTree = this.retainExtensions(pathDirTree,['.xml'])
        return displayedDirTree;
    }


    static clean (argDirTree, nvDirTree){
        nvDirTree['name']= argDirTree.name

        if(argDirTree.children){
            nvDirTree['children'] = []
            for(let argDirTreeChild of argDirTree.children ){

                // console.log(argDirTreeChild)
                let nvTreeNode = {};
                nvDirTree['children'].push(nvTreeNode)
                this.clean(argDirTreeChild,nvTreeNode)

                // nvDirTree['children'].push({})
                // this.clean(argDirTreeChild,nvDirTree['children'][nvDirTree['children'].length-1])
                
            }
            return 
        }
    }


    static retainExtensions(argDirTree, extensions ){
        if(argDirTree.type ==='file' ){
            if(extensions.includes(argDirTree.extension)){
                return {
                    name: argDirTree.name,
                    // id: `${argDirTree.name}_TestId`
                }
            }else{
                return null;
            }
        }else{
            let nvDirTreeChildren = [];
            for(let argDirTreeChild of argDirTree.children){
                let nvDirTreeChild = this.retainExtensions(argDirTreeChild, extensions)
                if(nvDirTreeChild!=null && nvDirTreeChild.hasOwnProperty('name')){
                    nvDirTreeChildren.push(nvDirTreeChild)
                }
            }
            if(nvDirTreeChildren.length>0){
                let newName = argDirTree.name==='packages'?'models':argDirTree.name;
                return {
                    name: newName,
                    // id: `${argDirTree.name}_TestId`,
                    children: nvDirTreeChildren
                } 
            }
           
        }
    }


}
module.exports = DirTree