module Lib.Request where

import Prelude

import Data.String (toUpper)
import FFI.Server (Request)

requestMethod :: Request -> String
requestMethod request = toUpper $ request.method