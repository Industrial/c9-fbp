module Message.Component.Input.GetSourceComponentInputMessage where

import Data.Argonaut (Json, JsonDecodeError, decodeJson, encodeJson)
import Data.Either (Either)

type GetSourceComponentInputMessage =
  { protocol :: String
  , command :: String
  , payload ::
      { name :: String
      }
  }

convertGetSourceComponentInputMessageToJson :: GetSourceComponentInputMessage -> Json
convertGetSourceComponentInputMessageToJson = encodeJson

convertGetSourceComponentInputMessageFromJson :: Json -> Either JsonDecodeError GetSourceComponentInputMessage
convertGetSourceComponentInputMessageFromJson = decodeJson
