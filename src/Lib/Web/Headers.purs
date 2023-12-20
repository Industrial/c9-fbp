module Lib.Web.Headers where

import Prelude

import Data.Maybe (Maybe)
import Data.Nullable (Nullable, toMaybe)
import Data.Tuple (Tuple)
import Effect (Effect)
import Lib.Web (Headers)

-- Properties
foreign import getEntries :: Headers -> Array (Array String)
foreign import getKeys :: Headers -> Array String
foreign import getValues :: Headers -> Array String

-- Methods
foreign import create :: Array (Tuple String String) -> Headers
foreign import appendHeader :: Headers -> String -> String -> Headers
foreign import deleteHeader :: Headers -> String -> Headers

foreign import getHeaderImpl :: Headers -> String -> Nullable String

getHeader ∷ Headers → String -> Maybe String
getHeader headers string = toMaybe $ getHeaderImpl headers string

foreign import hasHeader :: Headers -> String -> Effect Boolean
foreign import setHeader :: Headers -> String -> String -> Effect Unit
