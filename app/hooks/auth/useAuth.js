import { supabase } from '@/app/lib/supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setLoading, setUser, setError, clearAuthState } from '../../lib/features/auth/auth.slice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth); 

    const signIn = async (email, password) => {

        
        if (!email || !error) {
            toast.error("All inputs must be field")
            return
        }

        if (password.length < 6) {
            toast.error("The length of password must be 6", {theme: 'light'})
            return
        }


        dispatch(setLoading(true));
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error?.code === "invalid_credentials") {
                toast.error("The login or password incorrect")
            };

            if (error) {
                toast.error(error.message)
                return
            }

            dispatch(setUser(data.user));
   

        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const signUp = async (email, password) => {
        dispatch(setLoading(true));
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            dispatch(setUser(data.user));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const signOut = async () => {
        dispatch(setLoading(true));
        try {
            await supabase.auth.signOut();
            dispatch(clearAuthState());
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
            if (error) throw error;
        } catch (err) {
            dispatch(setError(err.message));
        }
    };

    return {
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
    };
};
