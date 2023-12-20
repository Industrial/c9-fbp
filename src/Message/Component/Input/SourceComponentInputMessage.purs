module Message.Component.Input.SourceComponentInputMessage where

import Data.Argonaut (Json, JsonDecodeError, decodeJson, encodeJson)
import Data.Either (Either)

type SourceComponentInputMessage =
  { protocol :: String
  , command :: String
  , payload :: {}
  }

convertSourceComponentInputMessageToJson :: SourceComponentInputMessage -> Json
convertSourceComponentInputMessageToJson = encodeJson

convertSourceComponentInputMessageFromJson :: Json -> Either JsonDecodeError SourceComponentInputMessage
convertSourceComponentInputMessageFromJson = decodeJson
