module Lib.Route where

import Prelude

import Data.Array as Array
import Data.Either (Either(..))
import Data.String as String
import Data.String.Regex (regex, test)
import Data.String.Regex.Flags (RegexFlags(..))
import Data.Tuple (Tuple(..))
import Debug as Debug
import Lib.Web.URL (URL)
import Lib.Web.URL as URL

type Route = String

newtype Parameter = Parameter String

parameterRegexFlags :: RegexFlags
parameterRegexFlags =
  RegexFlags
    { global: true
    , ignoreCase: true
    , multiline: false
    , dotAll: false
    , sticky: false
    , unicode: false
    }

isParameter :: String -> Boolean
isParameter str =
  case regex "^:[A-Za-z0-9_]+$" parameterRegexFlags of
    Left _ -> false
    Right re -> test re str

parts :: String -> Array String
parts = String.split $ String.Pattern "/"

matchesURL :: Route -> URL -> Boolean
matchesURL route url =
  let
    urlParts = parts $ URL.pathname url
    routeParts = parts route
    pairs = Array.zip urlParts routeParts
  in
    Array.all identity $ map match pairs
  where
  match :: (Tuple String String) -> Boolean
  match (Tuple a b) = a == b || isParameter b
