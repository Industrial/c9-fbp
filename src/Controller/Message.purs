module Controller.Message where

import Prelude

import Controller.MessageHandler.Component (getsource)
import Data.Argonaut (stringify)
import Data.Either (Either(..))
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Domain.Message (Message, messageFromJson, messageToJson)
import Lib.Middleware (parseJSONBody, responseTime)
import Lib.Response.Handler (badRequest, internalServerError, jsonContentTypeHeader, ok)
import Lib.Server (RequestHandler)

responseFromMessage :: Message -> RequestHandler
responseFromMessage message request = do
  let payload = messageToJson message
  let payloadString = stringify payload
  let
    headers = Map.fromFoldable
      [ jsonContentTypeHeader
      ]
  ok payloadString (Just headers) request

handleMessage :: RequestHandler
handleMessage r =
  responseTime
    ( \request -> do
        requestBodyE <- parseJSONBody request
        case requestBodyE of
          Left _error -> internalServerError Nothing r
          Right requestBody -> do
            let messageE = messageFromJson requestBody
            case messageE of
              Left _error -> internalServerError Nothing r
              Right message -> do
                case message.protocol of
                  "component" -> do
                    case message.command of
                      "getsource" -> do
                        let outputMessage = getsource message
                        responseFromMessage outputMessage r
                      _ -> badRequest Nothing r
                  _ -> badRequest Nothing r
    )
    r
