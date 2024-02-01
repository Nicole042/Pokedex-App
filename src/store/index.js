import {configureStore} from "@reduxjs/toolkit"
import trainer from './states/trainer.state'


export default configureStore ({
    reducer : {
        trainer
    }
})
