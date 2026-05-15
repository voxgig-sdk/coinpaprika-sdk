-- Coinpaprika SDK error

local CoinpaprikaError = {}
CoinpaprikaError.__index = CoinpaprikaError


function CoinpaprikaError.new(code, msg, ctx)
  local self = setmetatable({}, CoinpaprikaError)
  self.is_sdk_error = true
  self.sdk = "Coinpaprika"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CoinpaprikaError:error()
  return self.msg
end


function CoinpaprikaError:__tostring()
  return self.msg
end


return CoinpaprikaError
