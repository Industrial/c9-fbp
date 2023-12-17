module Message.Component.Input.ListComponentInputMessage where

import Data.Argonaut (Json, JsonDecodeError, decodeJson, encodeJson)
import Data.Either (Either)

type ListComponentInputMessage =
  { protocol :: String
  , command :: String
  , payload :: {}
  }

convertListComponentInputMessageToJson :: ListComponentInputMessage -> Json
convertListComponentInputMessageToJson = encodeJson

convertListComponentInputMessageFromJson :: Json -> Either JsonDecodeError ListComponentInputMessage
convertListComponentInputMessageFromJson = decodeJson
