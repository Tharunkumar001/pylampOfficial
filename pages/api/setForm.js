// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Default from "../../models/form";
import connectDB from "../../middleware/mongodb";
import { ContactSupportOutlined } from "@material-ui/icons";

const formHandler = async(req, res)=> {
    if(req.method === "POST"){
        const defaultForm = new Default({
            eventName: req.body.eventDetails.header.value,
            period: req.body.eventDetails.period.value,
            about: req.body.eventDetails.about.value,
            exactDate: new Date().toString(),
            formType: "Default"
        });

        defaultForm.save();
        res.status(200).send(defaultForm._id);
    }
    else if(req.method === "PUT"){
        const getDefaultFormData = await Default.find({_id: req.body.formId});
        if(getDefaultFormData !== null){
            res.status(200).send(getDefaultFormData);
        }else{
            res.send(false);
        }
    }
    else if(req.method == "GET"){
        const getEventDetails = await Default.find({});
        res.status(200).send(getEventDetails);
    }
}

export default connectDB(formHandler);