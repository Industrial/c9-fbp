module Message.Component.Output.SourceComponentOutputMessage where

import Data.Argonaut (Json, JsonDecodeError, decodeJson, encodeJson)
import Data.Either (Either)

type SourceComponentOutputMessage =
  { protocol :: String
  , command :: String
  , payload :: {}
  }

convertSourceComponentOutputMessageToJson :: SourceComponentOutputMessage -> Json
convertSourceComponentOutputMessageToJson = encodeJson

convertSourceComponentOutputMessageFromJson :: Json -> Either JsonDecodeError SourceComponentOutputMessage
convertSourceComponentOutputMessageFromJson = decodeJson
