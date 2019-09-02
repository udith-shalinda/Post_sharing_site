const express = require('express');
const multer = require("multer");
const List = require('../modles/list');
const checkAuth = require("../middleware/check-auth");


const router = express.Router();



const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg', 
    'image/jpg' : 'jpg'
}; 

const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mine type");
        if(isValid){
            error = null;
        }
        cb(error,"backend/image");
    },
    filename:(req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-' + Date.now() + '.'+ext);
    }
});



router.post('/',checkAuth, multer({storage:storage}).single("image") ,async(req,res,next)=>{
    let imagePath    = req.body.imagePath;
    if(req.file){
        const url = req.protocol + "://"+req.get('host');
        imagePath = url + "/image/" + req.file.filename;
    }
    const list = new List({
        username:req.body.username,
        profileImage:req.body.profileImage,
        title:req.body.title, 
        comment:req.body.comment,
         imagePath: imagePath,
         creater: req.userData.userId
        });

    // const list = req.body;
    // console.log(list);
    list.save()
    .then(result=>{
        // socketIO.emit('updated', {msg: true, list})
        res.status(201).json({
            message:'element added successfully',
            list:{
                ...result,
                id:result._id
            }
        });

    });

});




router.put('/:id',checkAuth,multer({storage:storage}).single("imagePath"),(req,res,next)=>{
    
    var io = req.app.get('socketio');
    // console.log("io is ",io);
    io.emit('update','sfsfsfsfs');

    let imagePath    = req.body.imagePath;
    if(req.file){
        const url = req.protocol + "://"+req.get('host');
        imagePath = url + "/image/" + req.file.filename;
    }
    const post = new List({
        _id: req.body.id,
        profileImage:req.body.profileImage,
        username:req.body.username,
        title:req.body.title,
        comment: req.body.comment,
        imagePath:imagePath,
        creater:req.body.userId
    });
    console.log(post);
    List.updateOne({ _id : req.params.id,creater:req.userData.userId},post).then(result=>{
        // console.log(result);
        if(result.nModified > 0){
            io.sockets.emit('updated', "sfsfsfsfs");
            res.status(200).json({massage:'Updated successfully'});
        }else{
            res.status(401).json({
                message:"Auth Failed"
            });
        }
    });
});


router.get('/',(req,res,next)=>{
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = List.aggregate([
        {
            "$lookup": {
                "from": "profileinfos",
                "localField": "creater",
                "foreignField": "creater",
                "as": "userInfo"
            }
        },
       ]);
    let fetchedPost;
        if(pageSize && currentPage){
            postQuery.skip(pageSize * (currentPage -1))
            .limit(pageSize);
        }

    
    postQuery.then((document)=>{
        fetchedPost = document;
        return List.count();
    }).then(count=>{
        res.status(200).json({
            message:'The list is fetched',
            List:fetchedPost,
            maxPost:count
        });
    });
});

router.get('/getPosts',(req,res,next)=>{
   List.aggregate([
    {
        "$lookup": {
            "from": "profileinfos",
            "localField": "creater",
            "foreignField": "creater",
            "as": "userInfo"
        }
    },
   ]).then((list) => {
    if (list){
        res.status(200).json({result:list,massage:"found list"});
    }else{
        res.status(401).json({message:'post is not found'});
    }
   });
});


router.get('/:id',(req,res,next)=>{
    List.findById(req.params.id)
    .then(post=>{
       if(post){
            res.status(200).json(post);
       }else{
            res.status(404).json({messsage:'post is not found'});
       }
    });
})

router.delete('/:id', checkAuth , (req,res,next)=>{
    console.log(req.params.id);
    List.deleteOne({_id:req.params.id,creater:req.userData.userId}).then((result)=>{
        console.log(result);
        if(result.n > 0){
            res.status(200).json({massage:'Delete successfully'});
        }else{
            res.status(401).json({
                message:"Auth Failed"
            });
        }
    });
});

router.delete("/deactivate",checkAuth,(req,res,next)=>{
    ProfileInfo.deleteMany({creater:req.userData.userId})
    .then(result=>{
        if(result){
            res.status(200).json({message:'Delete successfully'});
        }else{
            res.status(401).json({
                message:"Auth Failed"
            });
        }
    });
});


router.post("/getMyPosts", checkAuth ,(req,res,next)=>{
    List.find({creater:req.userData.userId})
        .then(tranformdata=>{
            res.status(201).json({
                result:tranformdata,
                message:"got my posts"
        });
    });
});

router.post("/getSomeOneElsePost/:creater", checkAuth ,(req,res,next)=>{
    List.find({creater:req.params.creater})
        .then(tranformdata=>{
            res.status(201).json({
                result:tranformdata,
                message:"got my posts"
        });
    });
});

// router.post("/watchList",(req,res,next)=>{
//     List.watch().on('change', change => {
//         if(change !== null){
//             res.status(201).json({
//                 message:"good"
//             });
//         }else{
//             res.status(401).json({
//                 message:"not good"
//             });
//         }
//     });
    
// });


module.exports = router;