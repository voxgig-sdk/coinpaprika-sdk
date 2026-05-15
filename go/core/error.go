package core

type CoinpaprikaError struct {
	IsCoinpaprikaError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCoinpaprikaError(code string, msg string, ctx *Context) *CoinpaprikaError {
	return &CoinpaprikaError{
		IsCoinpaprikaError: true,
		Sdk:              "Coinpaprika",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CoinpaprikaError) Error() string {
	return e.Msg
}
