module Domain.Network where

import Prelude

import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)

data Network = Network
  { isDebugging :: Boolean
  , isRunning :: Boolean
  , hasStarted :: Boolean
  , startTime :: Number
  }

derive instance genericNetwork :: Generic Network _
instance showNetwork :: Show Network where
  show = genericShow