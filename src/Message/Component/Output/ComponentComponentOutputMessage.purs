module Message.Component.Output.ComponentComponentOutputMessage where

import Data.Argonaut (Json, JsonDecodeError, decodeJson, encodeJson)
import Data.Either (Either)

type ComponentComponentOutputMessage =
  { protocol :: String
  , command :: String
  , payload :: {}
  }

convertComponentComponentOutputMessageToJson :: ComponentComponentOutputMessage -> Json
convertComponentComponentOutputMessageToJson = encodeJson

convertComponentComponentOutputMessageFromJson :: Json -> Either JsonDecodeError ComponentComponentOutputMessage
convertComponentComponentOutputMessageFromJson = decodeJson
