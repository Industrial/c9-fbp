module Message.Component.Output.ErrorComponentOutputMessage where

import Data.Argonaut (Json, JsonDecodeError, decodeJson, encodeJson)
import Data.Either (Either)

type ErrorComponentOutputMessage =
  { protocol :: String
  , command :: String
  , payload :: {}
  }

convertErrorComponentOutputMessageToJson :: ErrorComponentOutputMessage -> Json
convertErrorComponentOutputMessageToJson = encodeJson

convertErrorComponentOutputMessageFromJson :: Json -> Either JsonDecodeError ErrorComponentOutputMessage
convertErrorComponentOutputMessageFromJson = decodeJson
